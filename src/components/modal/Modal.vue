<script setup lang="ts">
import { useScrollStore } from '@/stores/scrollStore'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

const CANT_CLOSE_ANIMATE_TIME = 500

const props = defineProps<{
  show: boolean
}>()

const emits = defineEmits<{
  (e: 'autoClose'): void
}>()

const { lock: scrollLock, unlock: scrollUnlock } = useScrollStore()

// const cantCloseAnimate = ref(false)

// const cantCloseHandler = () => {
//   cantCloseAnimate.value = true
//   setTimeout(() => {
//     cantCloseAnimate.value = false
//   }, CANT_CLOSE_ANIMATE_TIME)
// }

const clickHandler = (e: MouseEvent) => {
  const isTarget = (e.target as Element).classList.contains('modal--background')
  if (isTarget) emits('autoClose')
}

watch(
  () => props.show,
  (show) => {
    if (show) scrollLock()
    else scrollUnlock()
  }
)
</script>

<template>
  <Teleport to="#modal--root">
    <Transition name="modal">
      <div
        class="modal--background absolute top-0 left-0 z-[1000] flex items-center justify-center w-vw h-screen overflow-hidden bg-black/50 backdrop-blur-sm"
        v-if="props.show"
        @click="clickHandler"
      >
        <slot />
      </div>
    </Transition>
  </Teleport>
</template>
