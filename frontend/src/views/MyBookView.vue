<script setup>
import { ref, onMounted } from "vue";
import {
  getMyReadingList,
  getBookDetails,
  getCoverUrl,
  removeFromReadingList,
} from "../services/api";
import { toast } from "vue3-toastify";

const readingList = ref([]);
const isLoading = ref(true);

const fetchMyBooks = async () => {
  try {
    const response = await getMyReadingList();
    const myBooks = response.data;
    const detailedBooks = await Promise.all(
      myBooks.map(async (item) => {
        const details = await getBookDetails(item.book_id);
        return {
          ...item,
          title: details?.title || "Judul Tidak Diketahui",
          cover_id: details?.covers ? details.covers[0] : null,
        };
      }),
    );

    readingList.value = detailedBooks;
  } catch (error) {
    console.error("Gagal memuat rak buku", error);
  } finally {
    isLoading.value = false;
  }
};

const removeBook = async (bookId) => {
  if (confirm("Hapus buku ini dari koleksimu ? ")) {
    try {
      readingList.value = readingList.value.filter((b) => b.book_id !== bookId);
    } catch (error) {
      toast.error("Gagal menghapus buku");
    }
  }
};

onMounted(() => {
  fetchMyBooks();
});
</script>

<template>
  <div class="max-w-6xl mx-auto py-8 px-6 min-h-[70vh]">
    <h1 class="text-3xl font-bold text-dark mb-8">Koleksi Buku Saya</h1>

    <div v-if="isLoading" class="text-center py-20 text-slate-500">
      <div class="animate-pulse">Menyusun rak bukumu...</div>
    </div>

    <div
      v-else-if="readingList.length === 0"
      class="text-center py-20 bg-slate-50 rounded-2xl border border-slate-100"
    >
      <p class="text-slate-500 mb-6">Rak bukumu masih kosong.</p>
      <router-link
        to="/"
        class="bg-primary hover:bg-[#21867a] text-white px-6 py-3 rounded-lg font-medium transition-colors"
      >
        Mulai Cari Buku
      </router-link>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="book in readingList"
        :key="book.id"
        class="flex bg-white p-4 rounded-xl shadow-sm border border-slate-100 gap-4 hover:shadow-md transition-shadow"
      >
        <img
          :src="
            getCoverUrl(book.cover_id) ||
            'https://via.placeholder.com/100x150?text=No+Cover'
          "
          alt="Cover"
          class="w-24 h-36 object-cover rounded-md border border-slate-100"
        />

        <div class="flex flex-col justify-between py-1">
          <div>
            <h3 class="font-bold text-dark line-clamp-2 leading-tight">
              {{ book.title }}
            </h3>

            <span
              class="inline-block mt-3 text-xs px-2.5 py-1 rounded-full font-semibold"
              :class="{
                'bg-blue-100 text-blue-700': book.status === 'want_to_read',
                'bg-yellow-100 text-yellow-700': book.status === 'reading',
                'bg-green-100 text-green-700': book.status === 'finished',
              }"
            >
              {{
                book.status === "want_to_read"
                  ? "Ingin Dibaca"
                  : book.status === "reading"
                    ? "Sedang Dibaca"
                    : "Selesai"
              }}
            </span>
          </div>

          <div class="mt-4">
            <router-link
              :to="'/book/' + book.book_id"
              class="text-sm font-medium text-primary hover:underline"
            >
              Lihat Detail &rarr;
            </router-link>
          </div>
          <button
            @click="removeBook(book.book_id)"
            class="text-xs text-red-400 hover:text-red-600 transition-colors"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
