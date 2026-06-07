<template>
  <div class="relative container mx-auto max-w-4xl p-2">
    <div class="text-center">
      <h1 class="text-2xl font-bold">Pastex</h1>
      <p class="text-base-content/70">Paste text. Share instantly.</p>
    </div>
    <div class="opacity-60 divider">New paste</div>
    <div>
      <textarea
        v-model="content"
        class="textarea h-72 w-full focus:outline-none"
      ></textarea>
    </div>
    <div class="opacity-60 divider">Options</div>

    <div class="flex flex-col gap-4">
      <!-- Title -->
      <div class="flex gap-2 items-center">
        <label class="w-24">Title</label>
        <input
          v-model="title"
          class="input input-sm w-full placeholder:opacity-60 focus:outline-none"
          placeholder="Untitled Paste"
        />
      </div>

      <!-- Password -->
      <div class="flex gap-2 items-center">
        <label class="w-24">Password</label>

        <input
          v-model="password"
          type="password"
          class="input input-sm w-full placeholder:opacity-60 focus:outline-none"
          placeholder="Optional encryption password"
        />
      </div>

      <!-- Expiry -->
      <div class="flex gap-2 items-center">
        <label class="w-24">Expires</label>

        <select
          v-model="expiry"
          class="select select-sm w-full placeholder:opacity-60 focus:outline-none"
        >
          <option value="">Never</option>

          <option value="1h">1 Hour</option>

          <option value="1d">1 Day</option>

          <option value="7d">7 Days</option>

          <option value="30d">30 Days</option>
        </select>
      </div>

      <!-- Stats -->
      <div class="flex gap-4 text-sm opacity-70">
        <span>{{ content.length }} chars</span>

        <span>
          {{ content.trim() ? content.trim().split(/\s+/).length : 0 }}
          words
        </span>
      </div>

      <span v-if="error" class="text-error text-sm">Error</span>

      <!-- Submit -->
      <button
        class="btn btn-primary"
        :disabled="!content.trim() || loading"
        @click="createPaste"
      >
        {{ loading ? "Uploading" : "Create Paste" }}
      </button>
    </div>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";

  import {
    createPaste as createPasteDoc,
    encryptText,
    getExpiryDate
  } from "@/api";

  const router = useRouter();

  const showSidebar = ref(false);

  const title = ref("");
  const content = ref("");
  const password = ref("");
  const expiry = ref("");

  const pasteUrl = ref("");

  const loading = ref(false);
  const error = ref(null);

  async function createPaste() {
    try {
      loading.value = true;
      error.value = null;

      let finalContent = content.value;
      let cryptoData = null;

      if (password.value.trim()) {
        const encrypted = await encryptText(content.value, password.value);

        finalContent = encrypted.content;
        cryptoData = encrypted.crypto;
      }

      const id = await createPasteDoc({
        title: title.value || "Untitled",
        content: finalContent,
        crypto: cryptoData,
        expiresAt: getExpiryDate(expiry.value)
      });

      router.replace(id);
    } catch (error) {
      error.value = error.toString() || "Unknown Error";
      console.error(error);
    } finally {
      loading.value = false;
    }
  }
</script>
