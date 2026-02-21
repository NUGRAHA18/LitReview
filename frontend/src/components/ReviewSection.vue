<script setup>
import { ref, onMounted } from "vue";
import { useAuth } from "../stores/auth";
import { addReview, getBookReviews } from "../services/api";

const props = defineProps({
  bookId: { type: String, required: true },
});

const { isAuthenticated, user } = useAuth();
const reviews = ref([]);
const newReview = ref({ rating: 5, content: "" });
const isSubmitting = ref(false);

//ambil data ulasan saat komponen dimuat
const fetchReviews = async () => {
  try {
    const response = await getBookReviews(props.bookId);
    reviews.value = response.data;
  } catch (error) {
    console.error("Gagal memuat ulasan:", error);
  }
};

//kirim ulasan
const submitReview = async () => {
  if (!newReview.value.content.trim()) return;

  isSubmitting.value = true;
  try {
    //gabungkan id buku dengan data form
    const playload = {
      book_id: props.bookId,
      rating: newReview.value.rating,
      content: newReview.value.content,
    };

    await addReview(playload);

    //Reset form dan ambil ulang daftar ulasan terbaru
    newReview.value.content = "";
    newReview.value.rating = 5;
    await fetchReviews();

    alert("Ulasan berhasil ditambahkan!");
  } catch (error) {
    alert(error.response?.data?.message || "Gagal mengirim ulasan");
  } finally {
    isSubmitting = false;
  }
};

onMounted(() => {
  fetchReviews();
});
</script>

<template>
  <div class="mt-12 pt-8 border-t border-slate-200">
    <h3 class="text-2xl font-bold text-dark mb-6">Ulasan Pembaca</h3>

    <div
      v-if="isAuthenticated()"
      class="bg-slate-50 p-6 rounded-xl border border-slate-100 mb-8"
    >
      <h4 class="font-medium text-slate-700 mb-4">
        Tulis Ulasanmu, {{ user?.username }}
      </h4>
      <form @submit.prevent="submitReview" class="space-y-4">
        <div>
          <label class="block text-sm text-slate-600 mb-1">Rating (1-5)</label>
          <select
            v-model="newReview.rating"
            class="px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary"
          >
            <option v-for="n in 5" :key="n" :value="n">{{ n }} Bintang</option>
          </select>
        </div>
        <div>
          <textarea
            v-model="newReview.content"
            rows="3"
            required
            placeholder="Bagaimana pendapatmu tentang buku ini?"
            class="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          ></textarea>
        </div>
        <button
          type="submit"
          :disabled="isSubmitting"
          class="bg-primary hover:bg-[#21867a] text-white px-5 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50"
        >
          {{ isSubmitting ? "Mengirim..." : "Kirim Ulasan" }}
        </button>
      </form>
    </div>

    <div v-else class="bg-blue-50 text-blue-700 p-4 rounded-lg mb-8 text-sm">
      Silakan
      <router-link to="/login" class="font-bold underline">Login</router-link>
      untuk menulis ulasan.
    </div>

    <div v-if="reviews.length === 0" class="text-slate-500 italic">
      Belum ada ulasan untuk buku ini. Jadilah yang pertama!
    </div>

    <div v-else class="space-y-6">
      <div
        v-for="review in reviews"
        :key="review.id"
        class="border-b border-slate-100 pb-6"
      >
        <div class="flex items-center gap-2 mb-2">
          <div class="font-bold text-dark">{{ review.username }}</div>
          <div class="text-yellow-500 text-sm">★ {{ review.rating }}/5</div>
          <div class="text-xs text-slate-400 ml-auto">
            {{ new Date(review.created_at).toLocaleDateString("id-ID") }}
          </div>
        </div>
        <p class="text-slate-600">{{ review.content }}</p>
      </div>
    </div>
  </div>
</template>
