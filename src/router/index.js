import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import PasteView from "@/views/PasteView.vue";
import PasteNotFound from "@/views/PasteNotFound.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: HomeView, name: "home" },
    { path: "/404", component: PasteNotFound, name: "notfound" },
    { path: "/:id", component: PasteView, name: "paste" }
  ]
});

export default router;
