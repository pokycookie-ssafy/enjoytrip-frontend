<script setup lang="ts">
import KakaoMap, { type IMarker } from '@/components/ui/KakaoMap.vue'

const marker: IMarker[] = [
  {
    lat: 33.450701,
    lng: 126.570667,
  },
  {
    lat: 33.449701,
    lng: 126.572667,
  },
  {
    lat: 33.453701,
    lng: 126.574667,
  },
]
</script>

<template>
  <main class="w-vw h-screen">
    <KakaoMap class="w-full h-full" :markers="marker" zoomControl />
  </main>
</template>
