<script setup lang="ts">
import dayjs from 'dayjs'
import { computed, onMounted, ref } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import ProfileImg from '@/components/ui/ProfileImg.vue'
import MutliImage from '@/components/ui/MutliImage.vue'
import Like from '@/components/ui/Like.vue'
import CommentInput from '@/components/ui/CommentInput.vue'
import AttractionReviewCard from '@/components/reviews/AttractionReviewCard.vue'
import type { IAttraction } from '@/types/Attraction'
import Pagination from '../ui/Pagination.vue'
import { QuillEditor } from '@vueup/vue-quill'
import Comment from '../ui/Comment.vue'
import CommentReview from '../ui/CommentReview.vue'
import type { IComment, ICommentResponse } from '@/types/Comment'
import { useAuthStore } from '@/stores/authStore'
import { api } from '@/axios.config'
import type { IResponseC } from '@/types/Response'

const props = defineProps<{
  content: string
  writer: string
  time: Date
  imgSrc: string[]
  attraction: IAttraction
  point: number
  profile: string
  reviewId: number
}>()

const authStore = useAuthStore()

const comments = ref<IComment[]>([])
const commentOpen = ref(false)
const pageIdx = ref(1)
const commentCount = ref(1)
const like = ref(false)

const likeHandler = async () => {}

const commentSubmitHandler = async (comment: string) => {
  try {
    if (!authStore.user) throw new Error()
    const { data } = await api.post(`/reviews/comments`, {
      userId: authStore.user.id,
      content: comment,
      reviewId: props.reviewId,
      parentId: null,
    })
    console.log(data)
    commentHandler()
  } catch (err) {
    console.error(err)
  }
}

const commentHandler = async () => {
  try {
    const { data } = await api.get<IResponseC<ICommentResponse[]>>(
      `/reviews/comments/${props.reviewId}?page=${pageIdx}`
    )
    console.log(data)
    const tmpComments: IComment[] = []
    commentCount.value = data.cnt

    data.data.forEach((e) => {
      tmpComments.push({
        id: e.id,
        writer: e.writer,
        content: e.content,
        created: new Date(e.commentCreatedDate),
        isReply: false,
      })
      e.commentList.forEach((e) => {
        tmpComments.push({
          id: e.id,
          writer: e.writer,
          content: e.content,
          created: new Date(e.commentCreatedDate),
          isReply: true,
        })
      })
    })
    comments.value = tmpComments
  } catch (err) {
    console.error(err)
  }
}

const paginationHandler = (idx: number) => {
  pageIdx.value = idx
}

const timeString = computed(() => {
  return dayjs(props.time).format('YY.MM.DD HH:mm')
})

onMounted(() => {
  commentHandler()
})
</script>

<template>
  <li
    class="w-full flex flex-col p-5 gap-5 text-sm text-zinc-500 rounded border shadow-sm"
  >
    <div class="flex justify-between items-start">
      <div class="flex items-center gap-2">
        <ProfileImg class="w-10 h-10" :src="props.profile" />
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

    <section class="no-border small">
      <QuillEditor
        theme="snow"
        readOnly
        :content="content"
        contentType="html"
        :options="{ modules: { toolbar: false } }"
      />
    </section>

    <div class="flex flex-col gap-2">
      <MutliImage :imgSrc="props.imgSrc" v-if="props.imgSrc.length > 0" />
      <AttractionReviewCard
        :attraction="props.attraction"
        :point="props.point"
      />
    </div>

    <div class="flex pl-1 pr-1 gap-5">
      <button
        class="flex justify-normal items-center gap-1 hover:text-indigo-600"
      >
        <Like :value="like" @onClick="likeHandler" />
        <p class="text-xs">좋아요 (56)</p>
      </button>
      <button
        class="flex justify-normal items-center gap-1 hover:text-indigo-600 data-[open=true]:text-indigo-600 data-[open=true]:hover:text-indigo-500"
        @click="commentOpen = !commentOpen"
        :data-open="commentOpen"
      >
        <FontAwesomeIcon icon="fa-regular fa-comment" />
        <p class="text-xs">댓글 ({{ commentCount }})</p>
      </button>
    </div>

    <!-- comment section -->
    <section class="flex flex-col gap-2" v-show="commentOpen">
      <div class="flex justify-start items-start gap-2 pb-2 border-b">
        <div class="w-9 h-9 flex justify-center items-center">
          <ProfileImg class="w-8 h-8" />
        </div>
        <CommentInput @onSubmit="commentSubmitHandler" />
      </div>
      <ul class="flex flex-col items-end gap-2">
        <CommentReview
          :id="e.id"
          :writer="e.writer"
          :content="e.content"
          :time="e.created"
          :isReply="e.isReply"
          :reviewId="props.reviewId"
          :commentHandler="commentHandler"
          v-for="e in comments"
        />
      </ul>
      <div class="w-full flex justify-center" v-if="commentCount > 15">
        <Pagination
          :idx="pageIdx"
          :countPerPage="15"
          :totalCount="commentCount"
          @onClick="paginationHandler"
          @onPrev="paginationHandler"
          @onNext="paginationHandler"
        />
      </div>
    </section>
  </li>
</template>
