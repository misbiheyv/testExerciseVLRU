import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/feed",
    name: "Feed",
    component: () => import("../views/TasksFeed.vue"),
  },
  {
    path: "/preview",
    name: "Preview",
    component: () =>
      import("../views/TaskPreview.vue"),
  },
  {
    path: "/edit",
    name: "Edit",
    component: () =>
      import("../views/TaskEdit.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
