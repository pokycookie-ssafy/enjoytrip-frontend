<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

const props = defineProps<{
  text: string[]
  duration?: number
  speed?: number
  delay?: number
}>()

const DEFAULT_DURATION = 2000
const DEFAULT_SPEED = 200
const DEFAULT_DELAY = 500

const text = ref('')
const isDeleting = ref(false)
const loopIdx = ref(0)

const tick = () => {
  if (props.text.length === 0) return

  const i = loopIdx.value % props.text.length
  const originText = props.text[i]

  if (isDeleting.value) {
    text.value = originText.substring(0, text.value.length - 1)
  } else {
    text.value = originText.substring(0, text.value.length + 1)
  }

  let delta = props.speed ?? DEFAULT_SPEED

  if (isDeleting.value) {
    delta /= 2
  }

  if (!isDeleting.value && text.value === originText) {
    delta = props.duration ?? DEFAULT_DURATION
    isDeleting.value = true
  } else if (isDeleting.value && text.value === '') {
    isDeleting.value = false
    loopIdx.value++
    delta = props.delay ?? DEFAULT_DELAY
  }

  setTimeout(() => {
    tick()
  }, delta)
}

watch(
  () => props.text,
  () => {
    tick()
  }
)
</script>

<template>
  <span>
    <p class="inline text-amber-400">
      {{ text }}
    </p>
    <p class="caret inline border-r-4"></p>
  </span>
</template>

<style scoped>
.caret {
  animation: blink-caret 0.75s step-end infinite;
}

@keyframes blink-caret {
  from,
  to {
    border-color: transparent;
  }
  50% {
    /* border-color: #4f46e5; */
    border-color: #fbbf24;
  }
}
</style>
