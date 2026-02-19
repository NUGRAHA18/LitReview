<script setup></script>

<template>
  <section
    class="bg-light min-h-[85vh] flex items-center px-6 py-12 md:px-20 overflow-hidden"
  >
    <div
      class="grid md:grid-cols-2 gap-12 items-center w-full max-w-7xl mx-auto"
    >
      <div class="space-y-6 z-10">
        <h1
          class="text-5xl md:text-6xl font-extrabold text-dark leading-tight tracking-tight"
        >
          Eksplorasi Dunia Melalui <span class="text-primary">Buku</span>.
        </h1>
        <p class="text-lg text-slate-500 md:pr-10">
          Platform modern untuk melacak bacaanmu, menemukan rekomendasi terbaik,
          dan berbagi ulasan jujur dengan komunitas.
        </p>
        <div class="pt-4">
          <button
            class="bg-primary hover:bg-[#21867a] text-white px-6 py-3.5 rounded-lg font-medium transition-all shadow-md flex items-center gap-2"
          >
            Mulai Membaca <span>↗</span>
          </button>
        </div>
      </div>

      <div class="relative w-full max-w-md mx-auto">
        <div
          class="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 relative z-10"
        >
          <div
            class="bg-slate-50 rounded-xl h-80 w-full flex items-center justify-center text-slate-400 border border-slate-100"
          >
            [Ilustrasi Cover Buku Nanti Di Sini]
          </div>
        </div>

        <div
          class="absolute -right-8 top-16 bg-white p-4 rounded-xl shadow-lg border border-slate-50 z-20 hidden md:block animate-bounce"
          style="animation-duration: 3s"
        >
          <div class="text-xs text-slate-400 font-medium mb-1">
            Rating Komunitas
          </div>
          <div class="text-xl font-extrabold text-dark flex items-center gap-1">
            <span class="text-yellow-400">★</span> 4.9 / 5
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
