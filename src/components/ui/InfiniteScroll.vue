<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'

const emits = defineEmits<{
  (e: 'onObserve'): void
}>()

const observerREF = ref<HTMLDivElement | null>(null)
const observer = ref<IntersectionObserver>()

const observerOptions: IntersectionObserverInit = {
  rootMargin: '0px',
  threshold: 1.0,
}

onMounted(() => {
  if (!observerREF.value) return
  observer.value = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) emits('onObserve')
    }, observerOptions)
  })
  observer.value.observe(observerREF.value)
})

onUnmounted(() => {
  if (observer.value) observer.value.disconnect()
})
</script>

<template>
  <div class="w-full" ref="observerREF"></div>
</template>
