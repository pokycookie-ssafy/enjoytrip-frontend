<script setup lang="ts">
const props = defineProps<{
  text: string
}>()
</script>

<template>
  <div class="flex items-center pointer-events-none absolute z-[995]">
    <div class="p-2 text-xs font-thin bg-gray-800 rounded text-nowrap">
      {{ props.text }}
    </div>
    <div class="tri"></div>
  </div>
</template>

<style scoped>
.tri {
  width: 0;
  height: 0;
  border-top: 7px solid transparent;
  border-bottom: 7px solid transparent;
  border-left: 7px solid #1f2937;
  border-right: 7px solid transparent;
}
</style>
