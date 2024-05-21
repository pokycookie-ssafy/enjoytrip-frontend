<script setup lang="ts">
import KakaoMap, { type IMarker } from '@/components/ui/KakaoMap.vue'
import { usePlanStore } from '@/stores/plan'
import { ref, watch } from 'vue'

const planStore = usePlanStore()

const marker = ref<IMarker[]>([])

watch(
  () => planStore.plan?.attractions,
  (attractions) => {
    if (!attractions) return
    const tmpMarker: IMarker[] = attractions.map((e) => ({
      lat: e.latitude,
      lng: e.longitude,
    }))
    marker.value = tmpMarker
  },
  { immediate: true }
)
</script>

<template>
  <main class="w-vw h-screen">
    <KakaoMap :markers="marker" zoomControl />
  </main>
</template>
