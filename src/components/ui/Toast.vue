<script setup lang="ts">
import { useToastStore } from '@/stores/toast'
import { TransitionGroup, computed } from 'vue'

const toast = useToastStore()
const messages = computed(() => {
  return toast.messages
})
</script>

<template>
  <div class="flex flex-col items-end fixed right-2 top-2 gap-2">
    <TransitionGroup name="toast">
      <div
        class="w-fit p-3 pl-4 pr-4 bg-zinc-800 bg-opacity-80 data-[type='danger']:bg-red-600 data-[type='danger']:bg-opacity-80 backdrop-blur-sm text-white rounded text-sm"
        v-for="e in messages"
        :key="e.id"
        :data-type="e.type"
      >
        {{ e.message }}
      </div>
    </TransitionGroup>
  </div>
</template>
