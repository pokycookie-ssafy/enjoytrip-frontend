<script setup lang="ts">
import dayjs from 'dayjs'
import ProfileImg from './ProfileImg.vue'
import { computed } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const props = defineProps<{
  writer: string
  content: string
  time: Date
  isReply?: boolean
}>()

const timeString = computed(() => {
  return dayjs(props.time).format('YY.MM.DD HH:mm')
})
</script>

<template>
  <li
    class="flex flex-col gap-2 border rounded p-3 bg-zinc-100 data-[reply=true]:w-indent w-full"
    :data-reply="props.isReply ?? false"
  >
    <div class="flex justify-between items-start">
      <div class="flex justify-start items-center gap-2">
        <ProfileImg class="w-8 h-8" />
        <span>
          <h2 class="text-zinc-700">{{ props.writer }}</h2>
          <p class="text-xs text-zinc-400 font-light">{{ timeString }}</p>
        </span>
      </div>
      <button class="hover:text-indigo-600" v-if="!props.isReply">
        <FontAwesomeIcon icon="fa-solid fa-reply" />
      </button>
    </div>
    <div class="p-1">
      <p>{{ props.content }}</p>
    </div>
  </li>
</template>
