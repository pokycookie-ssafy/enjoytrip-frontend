<script setup lang="ts">
const props = defineProps<{
  labels: String[]
  step: number
}>()

const emits = defineEmits<{
  (e: 'onClick', step: number): void
}>()
</script>

<template>
  <div class="flex gap-4 w-full p-3 border rounded-md select-none">
    <div
      class="flex-1 cursor-pointer"
      v-for="(label, i) in props.labels"
      @click="emits('onClick', i + 1)"
    >
      <div
        class="w-full h-1 bg-zinc-200 mb-2 rounded-full data-[step=true]:bg-indigo-600"
        :data-step="props.step >= i + 1"
      ></div>
      <p
        class="text-sm font-semibold text-zinc-500 data-[step=true]:text-indigo-600"
        :data-step="props.step >= i + 1"
      >
        {{ label }}
      </p>
    </div>
  </div>
</template>
