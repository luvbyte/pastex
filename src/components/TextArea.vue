<template>
  <div class="flex-1 min-h-0 overflow-y-auto bg-base-100 p-1">
    <article class="markdown-body" v-html="renderedMarkdown"></article>
  </div>
</template>

<script setup>
  import { computed } from "vue";
  import { marked } from "marked";
  import { markedHighlight } from "marked-highlight";
  import hljs from "highlight.js";

  import "highlight.js/styles/github-dark.css";
  // or
  // import "highlight.js/styles/github.css";

  import DOMPurify from "dompurify";

  const props = defineProps({
    content: {
      type: String,
      default: ""
    }
  });

  marked.use(
    markedHighlight({
      emptyLangClass: "hljs",
      langPrefix: "language-",
      highlight(code, lang) {
        const language = hljs.getLanguage(lang) ? lang : "plaintext";
        return hljs.highlight(code, { language }).value;
      }
    })
  );

  const renderedMarkdown = computed(() => {
    return DOMPurify.sanitize(marked.parse(props.content ?? ""));
  });
</script>
