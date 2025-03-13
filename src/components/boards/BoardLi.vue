<script setup lang="ts">
import type { IBoard } from '@/types/Board'
import dayjs from 'dayjs'
import { computed } from 'vue'

const props = defineProps<{
  data: IBoard
  isNotice?: boolean
}>()

const timeString = computed(() => {
  const now = dayjs(new Date())
  const targetTime = dayjs(props.data.updated)

  if (now.isSame(targetTime, 'date')) {
    return targetTime.format('HH:mm')
  }
  return targetTime.format('YY.MM.DD')
})
</script>

<template>
  <li
    class="flex justify-between items-center pt-3 pb-3 gap-3 text-sm text-zinc-600"
  >
    <p
      v-if="props.isNotice"
      class="bg-indigo-600 shrink-0 flex justify-center items-center select-none rounded text-white w-10 p-1 text-xs"
    >
      공지
    </p>
    <p v-if="!props.isNotice" class="text-xs w-10">{{ 156132 }}</p>
    <RouterLink
      class="ellipsis flex-1 text-zinc-700 hover:underline data-[notice=true]:text-indigo-600 data-[notice=true]:font-semibold"
      :to="{ path: `/boards/${props.data.id}` }"
      :data-notice="props.isNotice"
    >
      {{ props.data.title }}
    </RouterLink>
    <div class="flex items-center gap-2 text-xs">
      <p class="w-20 ellipsis">{{ props.data.writer }}</p>
      <p class="w-14 ellipsis text-center">{{ timeString }}</p>
      <p class="w-12 ellipsis text-center">{{ props.data.readCount }}</p>
      <p class="w-12 ellipsis text-center">{{ props.data.likeCount }}</p>
    </div>
  </li>
</template>
