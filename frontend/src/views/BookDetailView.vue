<script setup>
import { useRoute } from "vue-router";

// useRoute digunakan untuk mengambil parameter dari URL (misal: ID buku)
const route = useRoute();
</script>

<template>
  <div class="max-w-7xl mx-auto px-6 py-16 md:px-20 text-center">
    <h1 class="text-3xl font-extrabold text-dark mt-10">Halaman Detail Buku</h1>
    <p class="text-slate-500 mt-4 text-lg">
      ID Buku dari OpenLibrary:
      <span class="font-bold text-primary">{{ route.params.id }}</span>
    </p>
    <div class="mt-8">
      <router-link to="/" class="text-slate-500 hover:text-dark underline">
        &larr; Kembali ke Katalog
      </router-link>
    </div>
  </div>
</template>
