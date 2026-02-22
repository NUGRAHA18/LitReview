import { createRouter, createWebHistory } from "vue-router";

// Kita akan membuat komponen views ini di langkah selanjutnya
const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/book/:id", // :id adalah parameter dinamis untuk ID buku
    name: "BookDetail",
    component: () => import("../views/BookDetailView.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/RegisterView.vue"),
  },
  {
    path: "/my-books",
    name: "Mybooks",
    component: () => import("../views/MyBookView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
