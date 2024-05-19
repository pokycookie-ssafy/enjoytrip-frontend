<script setup lang="ts">
import type { IAttraction } from '@/types/Attraction'
import { ref } from 'vue'
import { useDnDStore } from '@/stores/dnd'

const props = defineProps<{
  data: IAttraction
  offset: {
    offsetX: number
    offsetY: number
    height: number
  }
}>()

const dndStore = useDnDStore()

const resizeREF = ref<HTMLDivElement | null>(null)

const clearEventListner = () => {
  window.removeEventListener('mousemove', onResizeHandler)
  window.removeEventListener('mouseup', clearEventListner)
}

const resizeHandler = () => {
  window.addEventListener('mousemove', onResizeHandler)
  window.addEventListener('mouseup', clearEventListner)
}

const onResizeHandler = (e: MouseEvent) => {
  console.log(e.clientY)
}

const mousedownHandler = (e: MouseEvent) => {
  if (
    resizeREF.value &&
    (resizeREF.value as HTMLElement).contains(e.target as HTMLElement)
  ) {
    return
  }

  dndStore.startDrag({
    attraction: props.data,
    height: 1,
  })
  window.addEventListener('mouseup', () => {
    dndStore.endDrag()
  })
}
</script>

<template>
  <button
    class="absolute cursor-all-scroll select-none border rounded p-2 bg-zinc-100 border-zinc-200 hover:bg-zinc-200 hover:border-zinc-300 text-zinc-800"
    :style="`height: ${1.25 * props.offset.height}rem; width: ${
      dndStore.width
    }px; left: ${props.offset.offsetX}px; top: ${props.offset.offsetY}px`"
    @mousedown="mousedownHandler"
  >
    <div
      class="absolute left-0 bottom-0 w-full h-2 bg-red-600 cursor-ns-resize"
      ref="resizeREF"
      @mousedown="resizeHandler"
    ></div>
    <!-- <p class="mb-1 text-left">{{ props.data.title }}</p> -->
  </button>
</template>
