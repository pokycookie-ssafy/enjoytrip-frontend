<script setup lang="ts">
import { useDnDStore } from '@/stores/dnd'
import type { IPos } from '@/types/Pos'
import { onUnmounted, ref, watch } from 'vue'

const dndStore = useDnDStore()

const pos = ref<IPos | null>(null)

const mousemoveHandler = (e: MouseEvent) => {
  pos.value = { x: e.clientX, y: e.clientY }
}

watch(
  () => dndStore.data,
  (data) => {
    if (data) {
      window.addEventListener('mousemove', mousemoveHandler)
    } else {
      window.removeEventListener('mousemove', mousemoveHandler)
      pos.value = null
    }
  },
  { immediate: true }
)

onUnmounted(() => {
  window.removeEventListener('mousemove', mousemoveHandler)
})
</script>

<template>
  <div
    v-if="pos && dndStore.data"
    class="fixed bg-zinc-700 bg-opacity-30 rounded -translate-x-1/2 -translate-y-1/2 pointer-events-none"
    :style="`left: ${pos.x}px; top: ${pos.y}px; height: ${
      1.25 * dndStore.data.height
    }rem; width: ${dndStore.width}px`"
  ></div>
</template>
