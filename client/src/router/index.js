import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/feed",
  },
  {
    path: "/edit",
    redirect: "/edit/0",
  },
  {
    path: "/feed",
    name: "Feed",
    component: () => import("../views/TasksFeed.vue"),
  },
  {
    path: "/preview/:id",
    name: "Preview",
    component: () => import("../views/TaskPreview.vue"),
    props: (route) => ({ ...route.params }),
  },
  {
    path: "/edit",
    name: "Edit",
    component: () => import("../views/TaskEdit.vue"),
    props: (route) => ({ ...route.params }),
  },
  {
    path: "/edit/:id",
    name: "Edit",
    component: () => import("../views/TaskEdit.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
