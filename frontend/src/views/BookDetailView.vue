<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getBookDetails, getCoverUrl } from "../services/api.js";
import ReviewSection from "../components/ReviewSection.vue";
import ReadingListButton from "../components/ReadingListButton.vue";

const route = useRoute();
const book = ref(null);
const isLoading = ref(true);

onMounted(async () => {
  isLoading.value = true;
  // Memanggil API menggunakan ID dari parameter URL
  const data = await getBookDetails(route.params.id);
  book.value = data;
  isLoading.value = false;
});

// Analogi: OpenLibrary kadang mengirim sinopsis berupa teks langsung, kadang berupa objek.
// Fungsi ini menstandarkan formatnya agar tidak error saat ditampilkan.
const getDescription = (desc) => {
  if (!desc) return "Sinopsis tidak tersedia untuk buku ini.";
  return typeof desc === "string" ? desc : desc.value;
};
</script>

<template>
  <div class="max-w-5xl mx-auto px-6 py-16 md:px-20 text-slate-800">
    <div
      v-if="isLoading"
      class="text-center py-20 animate-pulse text-slate-500"
    >
      Mengambil data dari perpustakaan...
    </div>

    <div v-else-if="book" class="flex flex-col md:flex-row gap-12">
      <div class="w-full md:w-1/3 flex-shrink-0">
        <img
          :src="
            getCoverUrl(book.covers?.[0]) ||
            'https://via.placeholder.com/300x450?text=No+Cover'
          "
          :alt="book.title"
          class="w-full rounded-xl shadow-lg object-cover border border-slate-100"
        />
        <ReadingListButton :bookId="route.params.id" />
      </div>

      <div class="flex-1 space-y-6">
        <div>
          <h1
            class="text-4xl font-extrabold text-dark tracking-tight leading-tight"
          >
            {{ book.title }}
          </h1>
          <p v-if="book.first_publish_date" class="text-lg text-slate-500 mt-2">
            Terbitan Pertama: {{ book.first_publish_date }}
          </p>
          <ReadingListButton :bookId="route.params.id" />
        </div>

        <div class="prose max-w-none text-slate-600">
          <h3 class="text-xl font-bold text-dark mb-3">Sinopsis</h3>
          <p class="whitespace-pre-line leading-relaxed">
            {{ getDescription(book.description) }}
          </p>
        </div>

        <div class="pt-8 border-t border-slate-100">
          <router-link
            to="/"
            class="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition-colors"
          >
            &larr; Kembali ke Katalog
          </router-link>
        </div>
        <ReviewSection :bookId="route.params.id" />
      </div>
    </div>

    <div v-else class="text-center py-20">
      <h2 class="text-2xl font-bold text-dark">Buku tidak ditemukan.</h2>
      <router-link
        to="/"
        class="text-primary hover:text-[#21867a] underline mt-4 inline-block font-medium"
      >
        Kembali ke Katalog
      </router-link>
    </div>
  </div>
</template>
