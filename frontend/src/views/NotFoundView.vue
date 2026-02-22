<template>
  <div
    class="min-h-[70vh] flex flex-col items-center justify-center text-center px-6"
  >
    <h1 class="text-9xl font-extrabold text-slate-200">404</h1>
    <h2 class="text-3xl font-bold text-dark mt-4">Halaman Tidak Ditemukan</h2>
    <p class="text-slate-500 mt-2 mb-8 max-w-md">
      Maaf, jalan yang kamu tuju sepertinya sudah dipindahkan atau memang tidak
      pernah ada.
    </p>
    <router-link
      to="/"
      class="bg-primary hover:bg-[#21867a] text-white px-6 py-3 rounded-lg font-medium transition-colors"
    >
      Kembali ke Beranda
    </router-link>
  </div>
</template>
