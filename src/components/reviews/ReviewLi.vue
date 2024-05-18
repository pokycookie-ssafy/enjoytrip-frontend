<script setup lang="ts">
import dayjs from 'dayjs'
import { computed, onMounted, ref } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import ProfileImg from '@/components/ui/ProfileImg.vue'
import MutliImage from '@/components/ui/MutliImage.vue'
import Like from '@/components/ui/Like.vue'
import CommentInput from '@/components/ui/CommentInput.vue'
import Comment from '@/components/ui/Comment.vue'
import AttractionReviewCard from '@/components/reviews/AttractionReviewCard.vue'
import type { IAttraction } from '@/types/Attraction'
import axios from 'axios'
import Pagination from '../ui/Pagination.vue'

const props = defineProps<{
  content: string
  writer: string
  time: Date
  imgSrc: string[]
}>()

const commentOpen = ref(false)
const mockAttraction = ref<IAttraction | null>(null)
const pageIdx = ref(1)

const paginationHandler = (idx: number) => {
  pageIdx.value = idx
}

const timeString = computed(() => {
  return dayjs(props.time).format('YY.MM.DD HH:mm')
})

onMounted(async () => {
  const { data } = await axios<IAttraction>('/api/attraction.json')
  mockAttraction.value = data
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

    <div class="flex flex-col gap-2">
      <MutliImage :imgSrc="props.imgSrc" />
      <AttractionReviewCard :attraction="mockAttraction" />
    </div>

    <div class="flex pl-1 pr-1 gap-5">
      <button
        class="flex justify-normal items-center gap-1 hover:text-indigo-600"
      >
        <Like :value="false" />
        <p class="text-xs">좋아요 (56)</p>
      </button>
      <button
        class="flex justify-normal items-center gap-1 hover:text-indigo-600 data-[open=true]:text-indigo-600 data-[open=true]:hover:text-indigo-500"
        @click="commentOpen = !commentOpen"
        :data-open="commentOpen"
      >
        <FontAwesomeIcon icon="fa-regular fa-comment" />
        <p class="text-xs">댓글 (12)</p>
      </button>
    </div>

    <!-- comment section -->
    <section class="flex flex-col gap-2" v-show="commentOpen">
      <div class="flex justify-start items-start gap-2 pb-2 border-b">
        <div class="w-9 h-9 flex justify-center items-center">
          <ProfileImg class="w-8 h-8" />
        </div>
        <CommentInput />
      </div>
      <ul class="flex flex-col items-end gap-2">
        <Comment
          writer="user1"
          content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
          :time="new Date()"
        />
        <Comment writer="user1" content="Reply!!!" :time="new Date()" isReply />
        <Comment writer="user1" content="OK" :time="new Date()" isReply />
        <Comment
          writer="user1"
          content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
          :time="new Date()"
        />
        <Comment writer="user1" content="Please help me" :time="new Date()" />
      </ul>
      <!-- comment count <= 15이면 표시 X -->
      <div class="w-full flex justify-center">
        <Pagination
          :idx="pageIdx"
          :countPerPage="15"
          :totalCount="178"
          @onClick="paginationHandler"
          @onPrev="paginationHandler"
          @onNext="paginationHandler"
        />
      </div>
    </section>
  </li>
</template>
