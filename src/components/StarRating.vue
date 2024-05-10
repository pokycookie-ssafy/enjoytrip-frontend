<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ref } from 'vue'

const props = defineProps<{
  value: number
  readonly?: boolean
}>()

const emits = defineEmits<{
  (e: 'onChange', value: number): void
}>()

const hover = ref<number | null>(null)

const clickHandler = (index: number) => {
  emits('onChange', index + 1)
}

const enterHandler = (index: number) => {
  hover.value = index
}

const leaveHandler = () => {
  hover.value = null
}

const iconHandler = (index: number) => {
  const value = hover.value ?? props.value - 1

  if (value >= index * 2 + 1) {
    return 'fa-solid fa-star'
  } else if (value >= index * 2) {
    return 'fa-solid fa-star-half-stroke'
  } else {
    return 'fa-regular fa-star'
  }
}
</script>

<template>
  <div class="text-indigo-600 flex">
    <div
      className="relative flex items-center justify-center min-w-5 min-h-5 aspect-square grow"
      v-for="(_, i) in 5"
      :key="i"
    >
      <FontAwesomeIcon :icon="iconHandler(i)" />
      <div
        class="absolute top-0 left-0 w-1/2 h-full bg-transparent cursor-pointer"
        v-if="!props.readonly"
        @click="clickHandler(i * 2)"
        @mouseenter="enterHandler(i * 2)"
        @mouseleave="leaveHandler()"
      ></div>
      <div
        class="absolute top-0 right-0 w-1/2 h-full bg-transparent cursor-pointer"
        v-if="!props.readonly"
        @click="clickHandler(i * 2 + 1)"
        @mouseenter="enterHandler(i * 2 + 1)"
        @mouseleave="leaveHandler()"
      ></div>
    </div>
  </div>
</template>
