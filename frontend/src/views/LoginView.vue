<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { loginUser } from "../services/api";

const router = useRouter();
const form = ref({ email: "", password: "" });
const errorMessage = ref("");
const isLoading = ref(false);

const handleLogin = async () => {
  try {
    isLoading.value = true;
    errorMessage.value = "";

    // Memanggil API Login
    const response = await loginUser(form.value);
    console.log(form);

    // Menyimpan token akses ke penyimpanan lokal browser (LocalStorage)
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));

    alert("Login berhasil!");
    router.push("/"); // Arahkan kembali ke halaman utama
  } catch (error) {
    // Menangkap pesan error dari backend
    errorMessage.value =
      error.response?.data?.message || "Terjadi kesalahan saat login.";
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
        Masuk ke Akunmu
      </h2>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div
          v-if="errorMessage"
          class="p-3 bg-red-50 text-red-600 rounded-lg text-sm text-center"
        >
          {{ errorMessage }}
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
            class="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="w-full bg-primary hover:bg-[#21867a] text-white px-4 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50 mt-2"
        >
          {{ isLoading ? "Memeriksa..." : "Masuk" }}
        </button>
      </form>

      <p class="mt-6 text-center text-sm text-slate-500">
        Belum punya akun?
        <router-link
          to="/register"
          class="text-primary hover:underline font-medium"
          >Daftar di sini</router-link
        >
      </p>
    </div>
  </div>
</template>
