<script setup>
import { useRouter } from "vue-router";
import { useAuth } from "../stores/auth";

const router = useRouter();
const { user, isAuthenticated, clearSession } = useAuth();

const handleLogin = () => {
  if (confirm("Apakah kamu yakin ingin keluar ? ")) {
    clearSession();
    router.push("/login");
  }
};
</script>

<template>
  <nav
    class="bg-white px-6 py-4 flex items-center justify-around shadow-sm sticky top-0 z-50"
  >
    <router-link to="/" class="text-2xl font-bold text-dark tracking-tight">
      Lit<span class="text-primary">Review</span>
    </router-link>

    <div class="hidden md:flex space-x-8 text-slate-500 font-medium">
      <router-link to="/" class="hover:text-dark transition-colors"
        >Home</router-link
      >
      <router-link to="/my-books" class="hover:text-dark transition-colors"
        >Koleksi Saya</router-link
      >
    </div>

    <div class="space-x-4 flex items-center">
      <template v-if="isAuthenticated()">
        <span class="text-sm text-slate-600 font-medium hidden md:block">
          Halo, <span class="font-bold text-primary">{{ user?.username }}</span>
        </span>
        <button
          @click="handleLogout"
          class="text-red-500 hover:text-red-700 font-medium transition-colors text-sm px-3 py-2 border border-red-100 rounded-lg hover:bg-red-50"
        >
          Logout
        </button>
      </template>

      <template v-else>
        <router-link
          to="/login"
          class="text-slate-600 font-medium hover:text-dark transition-colors"
        >
          Login
        </router-link>
        <router-link
          to="/register"
          class="bg-primary hover:bg-[#21867a] text-white px-5 py-2.5 rounded-lg font-medium transition-all shadow-sm"
        >
          Sign Up
        </router-link>
      </template>
    </div>
  </nav>
</template>
