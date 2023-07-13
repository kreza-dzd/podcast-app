import { createRouter, createWebHistory } from "vue-router";
import MusicView from "./views/MusicView.vue";
import HomeView from "./views/HomeView.vue";
import SettingsView from "./views/SettingsView.vue";

const routes = [
  {
    path: "/settings",
    name: "SettingsView",
    component: SettingsView,
  },
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

];

const router = createRouter({
  history: createWebHistory(process.env.NODE_ENV === 'production'
    ? '/podcast-app/'
    : '/'),
  routes,
});

export default router;