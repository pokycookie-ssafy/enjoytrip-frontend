<script setup lang="ts">
import dayjs from 'dayjs'
import { computed } from 'vue'
import ProfileImg from './ProfileImg.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import MutliImage from './MutliImage.vue'
import Like from './Like.vue'

const props = defineProps<{
  content: string
  writer: string
  time: Date
  imgSrc: string[]
}>()

const timeString = computed(() => {
  return dayjs(props.time).format('YY.MM.DD HH:mm')
})
</script>

<template>
  <li
    class="w-full flex flex-col p-5 gap-5 text-sm text-zinc-500 rounded border shadow-sm"
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
        <FontAwesomeIcon
          class="hover:text-indigo-600"
          icon="fa-solid fa-ellipsis"
        />
      </button>
    </div>
    <div class="flex flex-col gap-3 pl-1 pr-1">
      <h3 class="text-zinc-600 text-ellipsis overflow-hidden line-clamp-3">
        {{ content }}
      </h3>
    </div>
    <MutliImage :imgSrc="props.imgSrc" />
    <div class="flex pl-1 pr-1 gap-5">
      <button
        class="flex justify-normal items-center gap-1 hover:text-indigo-600"
      >
        <Like :value="false" />
        <p class="text-xs">좋아요 (56)</p>
      </button>
      <button
        class="flex justify-normal items-center gap-1 hover:text-indigo-600"
      >
        <FontAwesomeIcon icon="fa-regular fa-comment" />
        <p class="text-xs">댓글 (12)</p>
      </button>
    </div>

    <!-- comment section -->
    <section class="flex flex-col">
      <div class="flex justify-start items-start gap-2">
        <div class="w-9 h-9 flex justify-center items-center">
          <ProfileImg class="w-8 h-8" />
        </div>
        <p
          contenteditable
          class="border w-full outline-none rounded p-2 resize-none"
        ></p>
      </div>
    </section>
  </li>
</template>
