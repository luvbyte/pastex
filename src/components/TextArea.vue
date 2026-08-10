<template>
  <div class="flex-1 min-h-0 overflow-y-auto bg-base-100 p-1">
    <article
      v-if="format === 'mark'"
      class="markdown-body"
      v-html="renderedMarkdown"
    />
    <pre v-else class="hljs fscreen rounded-lg p-1 overflow-x-auto text-sm"><code v-html="highlightedCode"></code></pre>
  </div>
</template>

<script setup>
  import { computed } from "vue";
  import DOMPurify from "dompurify";

  import { marked } from "marked";
  import { markedHighlight } from "marked-highlight";
  import hljs from "highlight.js";

  const props = defineProps({
    content: {
      type: String,
      default: ""
    },
    format: {
      type: String,
      default: "mark",
      validator: v => ["mark", "code"].includes(v)
    }
  });

  const renderedMarkdown = computed(() =>
    DOMPurify.sanitize(marked.parse(props.content ?? ""))
  );

  const highlightedCode = computed(() => {
    const html = hljs.highlightAuto(props.content ?? "").value;
    return DOMPurify.sanitize(html);
  });
</script>
