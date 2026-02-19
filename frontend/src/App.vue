<script setup>
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <div class="font-sans antialiased bg-light min-h-screen flex flex-col">
    <Navbar />

    <router-view></router-view>
  </div>
</template>
