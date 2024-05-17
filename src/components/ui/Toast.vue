<script setup lang="ts">
import { useToastStore } from '@/stores/toast'
import { TransitionGroup, computed } from 'vue'

const toast = useToastStore()
const messages = computed(() => {
  return toast.messages
})
</script>

<template>
  <div class="w-full fixed left-0 top-0">
    <TransitionGroup name="toast">
      <div
        class="w-fit m-2 p-2 pl-3 pr-3 bg-zinc-800 bg-opacity-80 backdrop-blur-sm text-white rounded text-sm"
        v-for="e in messages"
        :key="e.id"
      >
        {{ e.message }}
      </div>
    </TransitionGroup>
  </div>
</template>
