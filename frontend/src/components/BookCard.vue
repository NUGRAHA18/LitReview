<script setup>
import { defineProps } from "vue";
import { getCoverUrl } from "../services/api.js";

//menerima data 1 buku dari komponen induk
const props = defineProps({
  book: Object,
});

// Mengambil cover ID pertama (jika ada) dan mengubahnya jadi URL gambar
const coverId = props.book.cover_i;
const coverUrl =
  getCoverUrl(coverId) || "https://via.placeholder.com/150x200?text=No+Cover";
</script>

<template>
  <div
    class="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow duration-200 flex flex-col"
  >
    <div class="h-56 bg-slate-100 overflow-hidden relative">
      <img
        :src="coverUrl"
        :alt="book.title"
        class="w-full h-full object-cover"
      />
    </div>

    <div class="p-4 flex flex-col flex-grow justify-between">
      <div>
        <h3 class="font-bold text-dark truncate" :title="book.title">
          {{ book.title }}
        </h3>
        <p class="text-sm text-slate-500 truncate mt-1">
          {{ book.author_name?.[0] || "Unknown Author" }}
        </p>
      </div>

      <div class="mt-4 flex justify-between items-center">
        <span
          class="text-xs bg-slate-50 text-slate-600 px-2 py-1 rounded-md border border-slate-100"
        >
          {{ book.first_publish_year || "-" }}
        </span>
        <router-link
          :to="`/book/${book.key.replace('/works/', '')}`"
          class="text-primary text-sm font-medium hover:text-[#21867a] transition-colors"
        >
          Detail
        </router-link>
      </div>
    </div>
  </div>
</template>
