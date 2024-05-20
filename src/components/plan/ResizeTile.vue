<script setup lang="ts">
import { useDnDStore } from '@/stores/dnd'
import { useResizeStore } from '@/stores/resize'

const dndStore = useDnDStore()
const resizeStore = useResizeStore()
</script>

<template>
  <div
    v-if="resizeStore.offset"
    class="pointer-events-none absolute cursor-all-scroll select-none border rounded p-2 bg-zinc-100 border-zinc-200"
    :style="`height: ${1.5 * resizeStore.height}rem; width: ${
      dndStore.width
    }px; left: ${resizeStore.offset.offsetX}px; top: ${
      resizeStore.offset.offsetY
    }px`"
  ></div>
</template>
