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
      overlay: `<div class="flex flex-col items-center"><div class="p-2 bg-zinc-700 cursor-default rounded transition-all ellipsis shadow-md text-sm shadow-zinc-800 text-white">${e.title}</div><div class="tri"></div></div>`,
    }))
    marker.value = tmpMarker
  },
  { immediate: true }
)
</script>

<template>
  <main class="w-vw h-screen">
    <KakaoMap :markers="marker" />
  </main>
</template>
