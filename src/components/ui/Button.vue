<script setup lang="ts">
const props = defineProps<{
  type?: 'default' | 'danger' | 'light'
}>()

const emits = defineEmits<{
  (e: 'onClick'): void
}>()
</script>

<template>
  <button
    class="rounded transition-colors text-white p-2 pl-4 pr-4 text-sm data-[type='light']:text-zinc-700 data-[type='light']:hover:bg-zinc-300 data-[type='light']:bg-zinc-200 bg-indigo-600 hover:bg-indigo-500 data-[type='danger']:hover:bg-red-600"
    @click="emits('onClick')"
    :data-type="props.type ?? 'default'"
  >
    <slot />
  </button>
</template>
