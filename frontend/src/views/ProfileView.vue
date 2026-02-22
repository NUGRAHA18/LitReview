<script setup>
import { useRouter } from "vue-router";
import { useAuth } from "../stores/auth";

const router = useRouter();
const { user, clearSession } = useAuth();

const handleLogout = () => {
  if (confirm("Apakah kamu yakin ingin keluar dari akun?")) {
    clearSession();
    router.push("/login");
  }
};
</script>
<template>
  <div class="max-w-2xl mx-auto py-12 px-6 min-h-[70vh]">
    <div class="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
      <div class="flex items-center gap-6 mb-8 border-b border-slate-100 pb-8">
        <div
          class="w-24 h-24 bg-primary text-white rounded-full flex items-center justify-center text-4xl font-bold"
        >
          {{ user?.username?.charAt(0).toUpperCase() || "U" }}
        </div>

        <div>
          <h1 class="text-3xl font-bold text-dark">{{ user?.username }}</h1>
          <p class="text-slate-500 mt-1">{{ user?.email }}</p>
        </div>
      </div>

      <div class="space-y-4">
        <router-link
          to="/my-books"
          class="block w-full text-center bg-slate-50 hover:bg-slate-100 text-slate-700 px-4 py-3 rounded-lg font-medium transition-colors border border-slate-200"
        >
          Lihat Koleksi Buku Saya
        </router-link>

        <button
          @click="handleLogout"
          class="block w-full text-center bg-red-50 hover:bg-red-100 text-red-600 px-4 py-3 rounded-lg font-medium transition-colors border border-red-100"
        >
          Keluar (Logout)
        </button>
      </div>
    </div>
  </div>
</template>
