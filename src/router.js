import { createRouter, createWebHistory } from "vue-router";
import MusicView from "./views/MusicView.vue";
import PodcastView from "./views/PodcastView.vue";
import HomeView from "./views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "HomeView",
    component: HomeView,
  },
  {
    path: "/music",
    name: "MusicView",
    component: MusicView,
  },
  {
    path: "/music",
    name: "PodcastView",
    component: PodcastView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
