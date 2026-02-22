import { createRouter, createWebHistory } from "vue-router";
import { useAuth } from "../stores/auth";
import { toast } from "vue3-toastify";

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
    meta: { requiresAuth: true },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/ProfileView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../views/NotFoundView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const { isAuthenticated } = useAuth();

  if (to.meta.requiresAuth && !isAuthenticated()) {
    toast.warning("Akses ditolak. Silakan login terlebih dahulu.");
    next("/login");
  } else if (
    (to.path === "/login" || to.path === "/register") &&
    isAuthenticated()
  ) {
    next("/profile");
  } else {
    next();
  }
});
export default router;
