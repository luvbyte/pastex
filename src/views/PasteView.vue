<template>
  <div class="container mx-auto max-w-4xl p-2 fscreen flex flex-col gap-2">
    <!-- Loading-->
    <div v-if="loading" class="flex-1 flex justify-center items-center">
      <Loading />
    </div>
    <!-- Encrypted -->
    <div
      v-else-if="isEncrypted"
      class="flex-1 flex justify-center items-center"
    >
      <div
        class="card bg-base-200 border border-base-content/20 w-full max-w-md shadow"
      >
        <div class="card-body">
          <h1 class="flex items-center text-lg gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 512 512"
            >
              <path d="M0 0h512v512H0z" fill="none" />
              <path
                fill="currentColor"
                d="m399.816 26.656l-38.025 28.782l9.318 12.312l12.967-9.814l-.392 41.216l15.439.147zm-334.609.225c-8.453 0-15.595 5.085-20.111 11.734c-4.517 6.65-6.973 15.136-6.973 24.364c0 9.227 2.456 17.714 6.973 24.363s11.658 11.734 20.111 11.734s15.597-5.085 20.113-11.734c4.517-6.65 6.973-15.136 6.973-24.363s-2.456-17.715-6.973-24.364s-11.66-11.734-20.113-11.734M256 34c-27.111 0-49.757 8.433-66.252 23.4c-16.495 14.968-26.617 35.397-33.133 58.204c-8.595 30.082-11.34 65.024-12.213 101.396h32.162c.978-35.083 3.635-67.454 10.82-92.604c5.485-19.193 13.363-33.764 23.868-43.296C221.757 71.567 235.112 66 256 66c20.889 0 34.243 5.567 44.748 15.1s18.383 24.103 23.867 43.296c7.186 25.15 9.843 57.521 10.82 92.604h32.163c-.873-36.372-3.618-71.314-12.213-101.396c-6.516-22.807-16.638-43.236-33.133-58.204C305.757 42.433 283.112 34 256 34M65.207 42.88c2.088 0 4.488 1.205 6.879 4.725s4.207 9.083 4.207 15.374c0 6.29-1.816 11.852-4.207 15.373s-4.791 4.724-6.879 4.724s-4.486-1.204-6.877-4.724s-4.207-9.083-4.207-15.373c0-6.291 1.816-11.853 4.207-15.374c2.391-3.52 4.79-4.724 6.877-4.724zm47.85 53.298L75.03 124.959l9.319 12.31l12.966-9.814l-.392 41.219l15.44.146l.693-72.642zm126.634.222c-8.452 0-15.596 5.086-20.113 11.735s-6.973 15.136-6.973 24.363s2.457 17.714 6.973 24.363c4.517 6.65 11.66 11.735 20.113 11.735s15.597-5.085 20.114-11.735c4.516-6.649 6.97-15.136 6.97-24.363s-2.454-17.714-6.97-24.363c-4.517-6.65-11.66-11.735-20.114-11.735m202.38 0c-8.454 0-15.598 5.086-20.114 11.735s-6.973 15.136-6.973 24.363s2.457 17.714 6.973 24.363c4.517 6.65 11.66 11.735 20.113 11.735s15.595-5.085 20.112-11.735s6.972-15.136 6.972-24.363s-2.456-17.714-6.972-24.363c-4.517-6.65-11.659-11.735-20.112-11.735zm-202.38 16c2.088 0 4.486 1.205 6.877 4.725s4.207 9.082 4.207 15.373s-1.816 11.853-4.207 15.373s-4.789 4.725-6.877 4.725s-4.487-1.205-6.879-4.725c-2.39-3.52-4.207-9.082-4.207-15.373s1.816-11.853 4.208-15.373c2.39-3.52 4.79-4.725 6.878-4.725m202.38 0c2.087 0 4.485 1.205 6.876 4.725s4.207 9.082 4.207 15.373s-1.816 11.853-4.207 15.373s-4.789 4.725-6.877 4.725s-4.488-1.205-6.879-4.725s-4.207-9.082-4.207-15.373s1.816-11.853 4.207-15.373s4.792-4.725 6.88-4.725m-132.397 49.871l-38.026 28.782l9.319 12.31l12.969-9.816l-.223 23.453h15.44l.52-54.729zm184.035 0l-38.025 28.782l9.318 12.31l12.969-9.816l-.393 41.22l15.44.147zm-449.16.223c-8.453 0-15.597 5.085-20.113 11.735c-4.517 6.649-6.973 15.135-6.973 24.363s2.456 17.714 6.973 24.363s11.66 11.734 20.113 11.734s15.597-5.085 20.113-11.734c4.517-6.65 6.973-15.136 6.973-24.363s-2.456-17.714-6.973-24.363s-11.66-11.735-20.113-11.735m0 16c2.087 0 4.486 1.205 6.877 4.725s4.209 9.082 4.209 15.373s-1.818 11.853-4.21 15.373c-2.39 3.52-4.789 4.724-6.876 4.724s-4.486-1.204-6.877-4.724s-4.21-9.083-4.21-15.373s1.819-11.853 4.21-15.373s4.79-4.725 6.877-4.725M137 235v238h238V235zM16 257v18h103v-18zm377 0v18h23v-18zm55 0v18h32v-18zm-192 31a32 32 0 0 1 32 32a32 32 0 0 1-23.19 30.764l23.19 80.98h-64l23.19-80.98A32 32 0 0 1 224 320a32 32 0 0 1 32-32m-208 1v18h48v-18zm384 0v18h48v-18zM32 337v18h80v-18zm361 0v18h71v-18zM16 385v18h48v-18zm80 0v18h23v-18zm320 0v18h64v-18zM48 433v18h71v-18zm352 0v18h32v-18zm48 0v18h48v-18z"
              />
            </svg>
            <span class="text-error"> Encrypted </span>Paste
          </h1>

          <p class="text-sm opacity-60">
            This paste is password protected. Enter the password to decrypt and
            view its contents.
          </p>

          <input
            v-model="password"
            type="password"
            placeholder="Enter password"
            class="input input-bordered w-full focus:outline-none placeholder:opacity-60"
            @keyup.enter="decryptPaste"
          />

          <p v-if="error" class="text-error text-sm">
            {{ error }}
          </p>

          <div class="card-actions justify-end">
            <button
              class="btn btn-primary"
              :disabled="!password.trim()"
              @click="decryptPaste"
            >
              Decrypt
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Content -->
    <div v-else class="flex-1 flex flex-col">
      <div class="border p-2 bg-base-200 rounded border-base-content/20">
        <h1 class="px-1 text-2xl truncate">{{ paste.title }}</h1>
        <div class="flex gap-2 items-center">
          <!-- createdAt -->
          <div class="flex items-center opacity-60">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path
                fill="currentColor"
                d="M8.5 14a1.25 1.25 0 1 0 0-2.5a1.25 1.25 0 0 0 0 2.5m0 3.5a1.25 1.25 0 1 0 0-2.5a1.25 1.25 0 0 0 0 2.5m4.75-4.75a1.25 1.25 0 1 1-2.5 0a1.25 1.25 0 0 1 2.5 0M12 17.5a1.25 1.25 0 1 0 0-2.5a1.25 1.25 0 0 0 0 2.5m4.75-4.75a1.25 1.25 0 1 1-2.5 0a1.25 1.25 0 0 1 2.5 0"
              />
              <path
                fill="currentColor"
                fill-rule="evenodd"
                d="M8 3.25a.75.75 0 0 1 .75.75v.75h6.5V4a.75.75 0 0 1 1.5 0v.758q.228.006.425.022c.38.03.736.098 1.073.27a2.75 2.75 0 0 1 1.202 1.202c.172.337.24.693.27 1.073c.03.365.03.81.03 1.345v7.66c0 .535 0 .98-.03 1.345c-.03.38-.098.736-.27 1.073a2.75 2.75 0 0 1-1.201 1.202c-.338.172-.694.24-1.074.27c-.365.03-.81.03-1.344.03H8.17c-.535 0-.98 0-1.345-.03c-.38-.03-.736-.098-1.073-.27a2.75 2.75 0 0 1-1.202-1.2c-.172-.338-.24-.694-.27-1.074c-.03-.365-.03-.81-.03-1.344V8.67c0-.535 0-.98.03-1.345c.03-.38.098-.736.27-1.073A2.75 2.75 0 0 1 5.752 5.05c.337-.172.693-.24 1.073-.27q.197-.016.425-.022V4A.75.75 0 0 1 8 3.25M7.25 6.5v-.242a6 6 0 0 0-.303.017c-.287.023-.424.065-.514.111a1.25 1.25 0 0 0-.547.547c-.046.09-.088.227-.111.514c-.024.296-.025.68-.025 1.253v.55h12.5V8.7c0-.572 0-.957-.025-1.253c-.023-.287-.065-.424-.111-.514a1.25 1.25 0 0 0-.547-.547c-.09-.046-.227-.088-.515-.111a6 6 0 0 0-.302-.017V6.5a.75.75 0 0 1-1.5 0v-.25h-6.5v.25a.75.75 0 0 1-1.5 0m11 3.75H5.75v6.05c0 .572 0 .957.025 1.252c.023.288.065.425.111.515c.12.236.311.427.547.547c.09.046.227.088.514.111c.296.024.68.025 1.253.025h7.6c.572 0 .957 0 1.252-.025c.288-.023.425-.065.515-.111a1.25 1.25 0 0 0 .547-.547c.046-.09.088-.227.111-.515c.024-.295.025-.68.025-1.252z"
                clip-rule="evenodd"
              />
              <path
                fill="currentColor"
                fill-rule="evenodd"
                d="M9.75 7.75A.75.75 0 0 1 10.5 7h3a.75.75 0 0 1 0 1.5h-3a.75.75 0 0 1-.75-.75"
                clip-rule="evenodd"
              />
            </svg>
            <p class="text-xs">
              {{ formatDate(paste.createdAt) }}
            </p>
          </div>
          <!-- expiresAt -->
          <div class="flex items-center gap-1 opacity-60">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <g
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
              >
                <path
                  d="M16 2v4M8 2v4m13 6c0-3.771 0-5.657-1.172-6.828S16.771 4 13 4h-2C7.229 4 5.343 4 4.172 5.172S3 8.229 3 12v2c0 3.771 0 5.657 1.172 6.828S7.229 22 11 22M3 10h18"
                />
                <path
                  d="M18.267 18.701L17 18v-1.733M21 18a4 4 0 1 1-8 0a4 4 0 0 1 8 0"
                />
              </g>
            </svg>

            <p class="text-xs">
              {{ formatDate(paste.expiresAt) }}
            </p>
          </div>

          <!-- Encrypted -->
          <div class="flex items-center gap-1 opacity-60">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 512 512"
            >
              <path d="M0 0h512v512H0z" fill="none" />
              <path
                fill="currentColor"
                d="m399.816 26.656l-38.025 28.782l9.318 12.312l12.967-9.814l-.392 41.216l15.439.147zm-334.609.225c-8.453 0-15.595 5.085-20.111 11.734c-4.517 6.65-6.973 15.136-6.973 24.364c0 9.227 2.456 17.714 6.973 24.363s11.658 11.734 20.111 11.734s15.597-5.085 20.113-11.734c4.517-6.65 6.973-15.136 6.973-24.363s-2.456-17.715-6.973-24.364s-11.66-11.734-20.113-11.734M256 34c-27.111 0-49.757 8.433-66.252 23.4c-16.495 14.968-26.617 35.397-33.133 58.204c-8.595 30.082-11.34 65.024-12.213 101.396h32.162c.978-35.083 3.635-67.454 10.82-92.604c5.485-19.193 13.363-33.764 23.868-43.296C221.757 71.567 235.112 66 256 66c20.889 0 34.243 5.567 44.748 15.1s18.383 24.103 23.867 43.296c7.186 25.15 9.843 57.521 10.82 92.604h32.163c-.873-36.372-3.618-71.314-12.213-101.396c-6.516-22.807-16.638-43.236-33.133-58.204C305.757 42.433 283.112 34 256 34M65.207 42.88c2.088 0 4.488 1.205 6.879 4.725s4.207 9.083 4.207 15.374c0 6.29-1.816 11.852-4.207 15.373s-4.791 4.724-6.879 4.724s-4.486-1.204-6.877-4.724s-4.207-9.083-4.207-15.373c0-6.291 1.816-11.853 4.207-15.374c2.391-3.52 4.79-4.724 6.877-4.724zm47.85 53.298L75.03 124.959l9.319 12.31l12.966-9.814l-.392 41.219l15.44.146l.693-72.642zm126.634.222c-8.452 0-15.596 5.086-20.113 11.735s-6.973 15.136-6.973 24.363s2.457 17.714 6.973 24.363c4.517 6.65 11.66 11.735 20.113 11.735s15.597-5.085 20.114-11.735c4.516-6.649 6.97-15.136 6.97-24.363s-2.454-17.714-6.97-24.363c-4.517-6.65-11.66-11.735-20.114-11.735m202.38 0c-8.454 0-15.598 5.086-20.114 11.735s-6.973 15.136-6.973 24.363s2.457 17.714 6.973 24.363c4.517 6.65 11.66 11.735 20.113 11.735s15.595-5.085 20.112-11.735s6.972-15.136 6.972-24.363s-2.456-17.714-6.972-24.363c-4.517-6.65-11.659-11.735-20.112-11.735zm-202.38 16c2.088 0 4.486 1.205 6.877 4.725s4.207 9.082 4.207 15.373s-1.816 11.853-4.207 15.373s-4.789 4.725-6.877 4.725s-4.487-1.205-6.879-4.725c-2.39-3.52-4.207-9.082-4.207-15.373s1.816-11.853 4.208-15.373c2.39-3.52 4.79-4.725 6.878-4.725m202.38 0c2.087 0 4.485 1.205 6.876 4.725s4.207 9.082 4.207 15.373s-1.816 11.853-4.207 15.373s-4.789 4.725-6.877 4.725s-4.488-1.205-6.879-4.725s-4.207-9.082-4.207-15.373s1.816-11.853 4.207-15.373s4.792-4.725 6.88-4.725m-132.397 49.871l-38.026 28.782l9.319 12.31l12.969-9.816l-.223 23.453h15.44l.52-54.729zm184.035 0l-38.025 28.782l9.318 12.31l12.969-9.816l-.393 41.22l15.44.147zm-449.16.223c-8.453 0-15.597 5.085-20.113 11.735c-4.517 6.649-6.973 15.135-6.973 24.363s2.456 17.714 6.973 24.363s11.66 11.734 20.113 11.734s15.597-5.085 20.113-11.734c4.517-6.65 6.973-15.136 6.973-24.363s-2.456-17.714-6.973-24.363s-11.66-11.735-20.113-11.735m0 16c2.087 0 4.486 1.205 6.877 4.725s4.209 9.082 4.209 15.373s-1.818 11.853-4.21 15.373c-2.39 3.52-4.789 4.724-6.876 4.724s-4.486-1.204-6.877-4.724s-4.21-9.083-4.21-15.373s1.819-11.853 4.21-15.373s4.79-4.725 6.877-4.725M137 235v238h238V235zM16 257v18h103v-18zm377 0v18h23v-18zm55 0v18h32v-18zm-192 31a32 32 0 0 1 32 32a32 32 0 0 1-23.19 30.764l23.19 80.98h-64l23.19-80.98A32 32 0 0 1 224 320a32 32 0 0 1 32-32m-208 1v18h48v-18zm384 0v18h48v-18zM32 337v18h80v-18zm361 0v18h71v-18zM16 385v18h48v-18zm80 0v18h23v-18zm320 0v18h64v-18zM48 433v18h71v-18zm352 0v18h32v-18zm48 0v18h48v-18z"
              />
            </svg>
            <p class="text-xs">Enc</p>
          </div>
        </div>
      </div>
      <div class="flex-1 flex flex-col border rounded border-base-content/20">
        <div
          class="p-2 bg-base-200 rounded-t flex items-center justify-between gap-2"
        >
          <div class="opacity-60">
            {{ formatTextSize(paste.content) }}
          </div>

          <div class="flex items-center gap-2">
            <button @click="copyContent" class="btn btn-xs btn-soft btn-info">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <g fill="none" stroke="currentColor" stroke-width="1.5">
                  <path
                    d="M6 11c0-2.828 0-4.243.879-5.121C7.757 5 9.172 5 12 5h3c2.828 0 4.243 0 5.121.879C21 6.757 21 8.172 21 11v5c0 2.828 0 4.243-.879 5.121C19.243 22 17.828 22 15 22h-3c-2.828 0-4.243 0-5.121-.879C6 20.243 6 18.828 6 16z"
                  />
                  <path
                    d="M6 19a3 3 0 0 1-3-3v-6c0-3.771 0-5.657 1.172-6.828S7.229 2 11 2h4a3 3 0 0 1 3 3"
                    opacity=".5"
                  />
                </g>
              </svg>
            </button>
            <button
              @click="downloadPaste"
              class="btn btn-xs btn-soft btn-primary"
            >
              Download
            </button>
            <button
              @click="sharePaste"
              class="btn btn-xs btn-soft btn-secondary"
            >
              Share
            </button>
          </div>
        </div>

        <textarea
          readonly
          class="p-2 flex-1 w-full textarea resize-none focus:outline-none"
          >{{ paste.content }}</textarea
        >
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, computed } from "vue";
  import { useRoute, useRouter } from "vue-router";

  import { getPaste, decryptText, formatTextSize } from "@/api";

  import Loading from "@/components/Loading.vue";

  const route = useRoute();
  const router = useRouter();

  const loading = ref(true);
  const toggleRaw = ref(false);

  const password = ref("");
  const error = ref("");

  const paste = ref(null);

  const isEncrypted = computed(() => {
    return !!paste.value?.crypto;
  });

  async function loadPaste() {
    loading.value = true;

    const data = await getPaste(route.params.id);

    if (!data) {
      router.replace("/404");
      return;
    }

    paste.value = data;

    loading.value = false;
  }

  async function decryptPaste() {
    try {
      const content = await decryptText(
        paste.value.content,
        password.value,
        paste.value.crypto
      );

      paste.value = {
        ...paste.value,
        content,
        crypto: null
      };

      error.value = "";
    } catch {
      error.value = "Invalid password";
    }
  }

  function formatDate(timestamp) {
    if (!timestamp) {
      return "Never";
    }

    return timestamp.toDate().toLocaleString();
  }

  function copyContent() {
    navigator.clipboard.writeText(paste.value.content);
  }

  function downloadPaste() {
    const blob = new Blob([paste.value.content], { type: "text/plain" });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = `${paste.value.title || "paste"}.txt`;

    a.click();

    URL.revokeObjectURL(url);
  }

  async function sharePaste() {
    const url = location.href;

    if (navigator.share) {
      await navigator.share({
        title: paste.value.title,
        url
      });

      return;
    }

    await navigator.clipboard.writeText(url);
  }

  onMounted(loadPaste);
</script>
