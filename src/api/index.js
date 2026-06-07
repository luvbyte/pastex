import {
  collection,
  doc,
  setDoc,
  getDoc,
  serverTimestamp
} from "firebase/firestore";

import { db } from "@/firebase";


export async function createPaste({
  title,
  content,
  crypto = null,
  expiresAt = null
}) {
  const ref = doc(collection(db, "pastes"));

  await setDoc(ref, {
    title: title.trim() || "Untitled",
    content,
    crypto,
    createdAt: serverTimestamp(),
    expiresAt
  });

  return ref.id;
}

export async function getPaste(id) {
  const snap = await getDoc(doc(db, "pastes", id));

  if (!snap.exists()) {
    return null;
  }

  const data = snap.data();

  if (data.expiresAt && data.expiresAt.toMillis() < Date.now()) {
    return null;
  }

  return {
    id: snap.id,
    ...data
  };
}

function toBase64(buffer) {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}

function fromBase64(base64) {
  return Uint8Array.from(atob(base64), c => c.charCodeAt(0));
}

export async function encryptText(text, password) {
  const salt = crypto.getRandomValues(new Uint8Array(16));

  const iv = crypto.getRandomValues(new Uint8Array(12));

  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveKey"]
  );

  const key = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 100000,
      hash: "SHA-256"
    },
    keyMaterial,
    {
      name: "AES-GCM",
      length: 256
    },
    false,
    ["encrypt"]
  );

  const encrypted = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv
    },
    key,
    new TextEncoder().encode(text)
  );

  return {
    content: toBase64(encrypted),

    crypto: {
      iv: toBase64(iv),
      salt: toBase64(salt),
      iterations: 100000
    }
  };
}

export async function decryptText(encryptedText, password, cryptoData) {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveKey"]
  );

  const key = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: fromBase64(cryptoData.salt),
      iterations: cryptoData.iterations,
      hash: "SHA-256"
    },
    keyMaterial,
    {
      name: "AES-GCM",
      length: 256
    },
    false,
    ["decrypt"]
  );

  const decrypted = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: fromBase64(cryptoData.iv)
    },
    key,
    fromBase64(encryptedText)
  );

  return new TextDecoder().decode(decrypted);
}

export function getExpiryDate(value) {
  const now = Date.now();

  switch (value) {
    case "1h":
      return new Date(now + 60 * 60 * 1000);

    case "1d":
      return new Date(now + 24 * 60 * 60 * 1000);

    case "7d":
      return new Date(now + 7 * 24 * 60 * 60 * 1000);

    case "30d":
      return new Date(now + 30 * 24 * 60 * 60 * 1000);

    default:
      return null;
  }
}

export function formatTextSize(text = "") {
  const bytes = new TextEncoder().encode(text).length;

  if (bytes < 1024) {
    return `${bytes.toFixed(2)} Bytes`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(2)} KB`;
  }

  if (bytes < 1024 * 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }

  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}
