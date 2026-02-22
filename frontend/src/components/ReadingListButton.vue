<script setup>
import { ref, onMounted } from "vue";
import { useAuth } from "../stores/auth";
import { updateBookReadingStatus, getMyReadingList } from "../services/api";

const props = defineProps({
  bookId: { type: String, required: true },
});

const { isAuthenticated } = useAuth();
const currentStatus = ref(""); // Menyimpan status buku saat ini
const isLoading = ref(false);

// Mengecek status buku ini di rak user saat komponen dimuat
const fetchCurrentStatus = async () => {
  if (!isAuthenticated()) return;

  try {
    const response = await getMyReadingList();
    // Cari apakah bookId ini ada di dalam daftar rak buku
    const bookInList = response.data.find(
      (item) => item.book_id === props.bookId,
    );

    if (bookInList) {
      currentStatus.value = bookInList.status;
    }
  } catch (error) {
    console.error("Gagal mengambil status rak buku:", error);
  }
};

// Mengirim update ke backend saat opsi dropdown diubah
const handleStatusChange = async () => {
  if (!currentStatus.value) return;

  isLoading.value = true;
  try {
    await updateBookReadingStatus(props.bookId, currentStatus.value);
    alert("Rak buku berhasil diperbarui!");
  } catch (error) {
    alert("Gagal memperbarui rak buku.");
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchCurrentStatus();
});
</script>

<template>
  <div v-if="isAuthenticated()" class="mt-6">
    <label class="block text-sm font-medium text-slate-700 mb-2"
      >Status Bacaan:</label
    >
    <select
      v-model="currentStatus"
      @change="handleStatusChange"
      :disabled="isLoading"
      class="bg-white border border-slate-300 text-slate-700 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full md:w-64 p-2.5 shadow-sm transition-colors"
    >
      <option value="" disabled>+ Tambah ke Rak Buku</option>
      <option value="want_to_read">📖 Ingin Dibaca</option>
      <option value="reading">⏳ Sedang Dibaca</option>
      <option value="finished">✅ Selesai Dibaca</option>
    </select>
  </div>
</template>
