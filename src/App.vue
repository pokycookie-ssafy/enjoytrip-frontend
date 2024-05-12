<script setup lang="ts">
import Header from './components/layout/Header.vue'
import UserNavigation from './components/layout/UserNavigation.vue'
import VarticalFrame from './components/layout/VarticalFrame.vue'
import FrameView from './views/FrameView.vue'
</script>

<template>
  <Header />
  <RouterView />
  <VarticalFrame>
    <FrameView />
  </VarticalFrame>
  <UserNavigation />
</template>
