import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "github-markdown-css/github-markdown.css";
import "highlight.js/styles/github-dark.css";
import "./main.css";

import { marked } from "marked";
import hljs from "highlight.js";
import { markedHighlight } from "marked-highlight";

marked.use(
  markedHighlight({
    emptyLangClass: "hljs",
    langPrefix: "language-",
    highlight(code, lang) {
      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(code, { language: lang }).value;
      }

      return hljs.highlightAuto(code).value;
    }
  })
);

const app = createApp(App);

app.use(router);

app.mount("#app");
