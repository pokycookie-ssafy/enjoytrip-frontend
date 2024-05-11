<script setup lang="ts">
import Header from './components/layout/Header.vue'
import UserNavigation from './components/layout/UserNavigation.vue'
</script>

<template>
  <Header />
  <RouterView />
  <UserNavigation />
</template>
