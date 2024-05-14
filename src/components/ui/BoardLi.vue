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
  return dayjs(props.time).format('YY.MM.DD HH:mm')
})
</script>

<template>
  <li
    class="flex flex-col p-3 pl-4 pr-4 gap-4 text-sm text-zinc-500 rounded border shadow-sm"
  >
    <div class="flex justify-between items-start">
      <div class="flex items-center gap-2">
        <ProfileImg class="w-10 h-10" />
        <span>
          <h2 class="text-zinc-700">{{ props.writer }}</h2>
          <p class="text-xs text-zinc-400 font-light">{{ timeString }}</p>
        </span>
      </div>
      <button>
        <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
      </button>
    </div>
    <div class="flex justify-between items-center gap-3">
      <!-- <div
        v-if="isNotice"
        class="bg-indigo-600 select-none rounded text-white p-1 text-xs"
      >
        공지
      </div> -->
      <h3 class="ellipsis text-lg font-medium text-zinc-600">
        {{ title }}
      </h3>
    </div>
    <!-- <textarea
      class="resize-none max-h-96 min-h-32 outline-none bg-red-100"
      readonly
      >{{ props.title }}</textarea
    > -->
    <!--
    <RouterLink
      :to="'#'"
      class="flex-1 overflow-hidden text-nowrap text-ellipsis text-zinc-600 hover:underline cursor-pointer"
    >
      {{ props.title }}
    </RouterLink>
    <div class="flex gap-4">
      <p class="hover:underline cursor-pointer">{{ props.writer }}</p>
      <p>{{ timeString }}</p>
    </div> -->
  </li>
</template>
