<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { registerUser } from "../services/api";

const router = useRouter();
const form = ref({ username: "", email: "", password: "" });
const errorMessage = ref("");
const isLoading = ref(false);

const handleRegister = async () => {
  try {
    isLoading.value = true;
    errorMessage.value = "";

    // Memanggil API Register
    await registerUser(form.value);

    alert("Registrasi berhasil! Silakan login dengan akun barumu.");
    router.push("/login"); // Arahkan ke halaman login setelah sukses
  } catch (error) {
    // Menangkap pesan error dari backend (misal: email sudah terpakai)
    errorMessage.value =
      error.response?.data?.message || "Terjadi kesalahan saat registrasi.";
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="min-h-[80vh] flex items-center justify-center px-6">
    <div
      class="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 w-full max-w-md"
    >
      <h2 class="text-2xl font-bold text-dark mb-6 text-center">
        Daftar Akun Baru
      </h2>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <div
          v-if="errorMessage"
          class="p-3 bg-red-50 text-red-600 rounded-lg text-sm text-center"
        >
          {{ errorMessage }}
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1"
            >Username</label
          >
          <input
            v-model="form.username"
            type="text"
            required
            class="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            placeholder="Budi123"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1"
            >Email</label
          >
          <input
            v-model="form.email"
            type="email"
            required
            class="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            placeholder="contoh@email.com"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1"
            >Password</label
          >
          <input
            v-model="form.password"
            type="password"
            required
            minlength="6"
            class="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            placeholder="Minimal 6 karakter"
          />
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="w-full bg-primary hover:bg-[#21867a] text-white px-4 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50 mt-2"
        >
          {{ isLoading ? "Memproses..." : "Daftar Sekarang" }}
        </button>
      </form>

      <p class="mt-6 text-center text-sm text-slate-500">
        Sudah punya akun?
        <router-link
          to="/login"
          class="text-primary hover:underline font-medium"
          >Masuk di sini</router-link
        >
      </p>
    </div>
  </div>
</template>
