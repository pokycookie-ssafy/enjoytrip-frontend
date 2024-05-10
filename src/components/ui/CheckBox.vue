<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const props = defineProps<{
  value: boolean
}>()

const emits = defineEmits<{
  (e: 'onClick', value: boolean): boolean
}>()
</script>

<template>
  <button
    class="text-indigo-600 w-5 h-5 flex justify-center items-center outline-none"
    @click="emits('onClick', !props.value)"
  >
    <FontAwesomeIcon v-if="props.value" icon="fa-solid fa-square-check" />
    <FontAwesomeIcon v-if="!props.value" icon="fa-regular fa-square" />
  </button>
</template>
