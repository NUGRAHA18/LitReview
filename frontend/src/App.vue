<script setup>
import { ref, onMounted } from "vue";
import Navbar from "./components/Navbar.vue";
import Hero from "./components/Hero.vue";
import BookCard from "./components/BookCard.vue";
import { searchBooks } from "./services/api.js";

// State untuk menyimpan daftar buku dan status loading
const books = ref([]);
const isLoading = ref(true);
const searchQuery = ref("Harry Potter"); // Nilai awal saat web dibuka

//Fungsi untuk mengeksekusi pencarian
const handleSearch = async () => {
  if (!searchQuery.value.trim()) return; // Cegah pencarian kosong
  isLoading.value = true;
  books.value = await searchBooks(searchQuery.value);
  isLoading.value = false;
};

// Jalankan pencarian default saat komponen dimuat
onMounted(() => {
  handleSearch();
});
</script>

<template>
  <div class="font-sans antialiased bg-light min-h-screen">
    <Navbar />
    <Hero />

    <main class="max-w-7xl mx-auto px-6 py-16 md:px-20">
      <div
        class="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h2 class="text-3xl font-extrabold text-dark tracking-tight">
            Katalog Buku
          </h2>
          <p class="text-slate-500 mt-2">Cari dan temukan bacaan favoritmu.</p>
        </div>

        <form @submit.prevent="handleSearch" class="flex gap-2">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari judul buku..."
            class="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-full md:w-72"
          />
          <button
            type="submit"
            class="bg-primary hover:bg-[#21867a] text-white px-5 py-2 rounded-lg font-medium transition-colors shadow-sm"
          >
            Cari
          </button>
        </form>
      </div>

      <div
        v-if="isLoading"
        class="text-center text-slate-500 py-20 animate-pulse"
      >
        Mencari buku...
      </div>

      <div
        v-else-if="books.length === 0"
        class="text-center text-slate-500 py-20"
      >
        Buku tidak ditemukan. Coba kata kunci lain.
      </div>

      <div v-else class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        <BookCard v-for="book in books" :key="book.key" :book="book" />
      </div>
    </main>
  </div>
</template>
