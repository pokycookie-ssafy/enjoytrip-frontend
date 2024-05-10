<script setup lang="ts">
import bg from '@/assets/img/blue.jpg'
</script>

<template>
  <section class="w-full h-screen relative">
    <img
      :src="bg"
      class="object-cover absolute left-0 top-0 -z-10 w-full h-full"
    />
  </section>
</template>
