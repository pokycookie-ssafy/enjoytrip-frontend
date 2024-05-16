<script setup lang="ts">
import type { IBoard } from '@/types/Board'

const props = defineProps<{
  data: IBoard
}>()
</script>

<template>
  <main class="w-vw p-24 flex justify-center">
    <section
      class="flex flex-col w-full max-w-[800px] rounded border p-4"
    ></section>
  </main>
</template>
