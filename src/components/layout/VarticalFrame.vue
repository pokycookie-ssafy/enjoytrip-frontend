<script setup lang="ts">
import { onMounted, ref } from 'vue'

const MIN_WIDTH = 320
const MIN_DIFF = 50
const HANDLER_WIDTH = 32

const width = ref(0)
const isResizing = ref(false)

const mousemoveHandler = (e: MouseEvent) => {
  width.value = e.x - 12
}

const mousedownHandler = () => {
  isResizing.value = true
  window.addEventListener('mousemove', mousemoveHandler)
  window.addEventListener('mouseup', mouseupHandler)
}

const mouseupHandler = () => {
  isResizing.value = false
  const screenWidth = window.innerWidth

  if (width.value >= screenWidth - HANDLER_WIDTH) {
    width.value = screenWidth - HANDLER_WIDTH
  } else if (width.value < MIN_WIDTH) {
    if (width.value < MIN_WIDTH / 2) width.value = 0
    else width.value = MIN_WIDTH
  } else {
    width.value = width.value - (width.value % MIN_DIFF)
  }

  window.removeEventListener('mouseup', mouseupHandler)
  window.removeEventListener('mousemove', mousemoveHandler)
}

const resizeHandler = () => {
  const screenWidth = window.innerWidth
  if (width.value >= screenWidth - HANDLER_WIDTH) {
    width.value = screenWidth - HANDLER_WIDTH
  }
  if (width.value < MIN_WIDTH) {
    if (width.value < MIN_WIDTH / 2) width.value = 0
    else width.value = MIN_WIDTH
  }
}

onMounted(() => {
  window.addEventListener('resize', resizeHandler)
})
</script>

<template>
  <section class="h-screen flex fixed top-0 left-0 z-[998]">
    <div
      class="shadow flex-1 bg-zinc-50 data-[resize=false]:transition-all rounded-tr rounded-br data-[resize=true]:pointer-events-none overflow-hidden"
      :style="`width: ${width}px`"
      :data-resize="isResizing"
    >
      <slot />
    </div>
    <button
      class="p-2 flex flex-col justify-center items-center h-full cursor-ew-resize outline-none group"
      @mousedown="mousedownHandler"
    >
      <div
        class="w-2 h-12 rounded-full bg-zinc-700 group-hover:bg-indigo-500 transition-colors"
      ></div>
    </button>
  </section>
</template>

<style scoped>
.shadow {
  box-shadow: 3px 0px 15px 3px rgba(0, 0, 0, 0.1);
}
</style>
