<script setup>
// Logika javascript untuk navbar bisa ditaruh di sini nanti
</script>
<template>
  <nav
    class="bg-white px-6 py-4 flex items-center justify-around shadow-sm sticky top-0 z-50"
  >
    <div class="text-2xl font-bold text-dark tracking-tight">
      Lit<span class="text-primary">Review</span>
    </div>

    <div class="hidden md:flex space-x-8 text-slate-500 font-medium">
      <a href="#" class="hover:text-dark transition-colors">Home</a>
      <a href="#" class="hover:text-dark transition-colors">Katalog</a>
      <a href="#" class="hover:text-dark transition-colors">Komunitas</a>
    </div>

    <div class="space-x-4 flex items-center">
      <button
        class="text-slate-600 font-medium hover:text-dark transition-colors"
      >
        Login
      </button>
      <button
        class="bg-primary hover:bg-[#21867a] text-white px-5 py-2.5 rounded-lg font-medium transition-all shadow-sm"
      >
        Sign Up
      </button>
    </div>
  </nav>
</template>
