<script setup lang="ts">
const emits = defineEmits<{
  (e: 'onClick'): void
}>()
</script>

<template>
  <button
    class="rounded transition-colors text-white bg-indigo-600 p-2 pl-4 pr-4 text-sm hover:bg-indigo-500"
    @click="emits('onClick')"
  >
    <slot />
  </button>
</template>
