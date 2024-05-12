<script setup lang="ts">
import dayjs from 'dayjs'
import { computed } from 'vue'

const props = defineProps<{
  title: string
  writer: string
  time: Date
  isNotice?: boolean
}>()

const timeString = computed(() => {
  return dayjs(props.time).format('YY.MM.DD HH:mm')
})
</script>

<template>
  <li
    class="flex justify-between items-center gap-4 p-3 text-sm text-zinc-500 rounded border shadow"
  >
    <div
      v-if="isNotice"
      class="bg-indigo-600 select-none rounded text-white p-1 text-xs"
    >
      공지
    </div>
    <RouterLink
      :to="'#'"
      class="flex-1 overflow-hidden text-nowrap text-ellipsis text-zinc-600 hover:underline cursor-pointer"
    >
      {{ props.title }}
    </RouterLink>
    <div class="flex gap-4">
      <p class="hover:underline cursor-pointer">{{ props.writer }}</p>
      <p>{{ timeString }}</p>
    </div>
  </li>
</template>
