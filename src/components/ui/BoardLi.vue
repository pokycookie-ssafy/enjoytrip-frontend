<script setup lang="ts">
import dayjs from 'dayjs'
import { computed } from 'vue'
import ProfileImg from './ProfileImg.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const props = defineProps<{
  title: string
  writer: string
  time: Date
  isNotice?: boolean
}>()

const timeString = computed(() => {
  const now = dayjs(new Date())
  const targetTime = dayjs(props.time)

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
      v-if="isNotice"
      class="bg-indigo-600 shrink-0 flex justify-center items-center select-none rounded text-white w-10 p-1 text-xs"
    >
      공지
    </p>
    <p v-if="!isNotice" class="text-xs w-10">{{ 156132 }}</p>
    <RouterLink
      class="ellipsis flex-1 text-zinc-700 hover:underline data-[notice=true]:text-indigo-600 data-[notice=true]:font-semibold"
      :to="'#'"
      :data-notice="props.isNotice"
    >
      {{ title }}
    </RouterLink>
    <div class="flex items-center gap-2 text-xs">
      <!-- <ProfileImg class="w-7 h-7" /> -->
      <p class="w-20 ellipsis">{{ props.writer }}</p>
      <p class="w-12 ellipsis">{{ timeString }}</p>
      <p class="w-12 ellipsis">3576</p>
      <p class="w-12 ellipsis">1200</p>
    </div>
  </li>
</template>
