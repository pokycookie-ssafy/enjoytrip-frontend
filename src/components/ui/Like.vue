<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const props = defineProps<{
  value: boolean
}>()

const emits = defineEmits<{
  (e: 'onClick'): void
}>()
</script>

<template>
  <button @click="emits('onClick')">
    <FontAwesomeIcon v-if="!props.value" icon="fa-regular fa-heart" />
    <FontAwesomeIcon v-if="props.value" icon="fa-solid fa-heart" />
  </button>
</template>
