<script setup lang="ts">
import dayjs from 'dayjs'
import ProfileImg from './ProfileImg.vue'
import { computed, ref } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import CommentInput from './CommentInput.vue'
import { useAuthStore } from '@/stores/authStore'
import { api } from '@/axios.config'

const props = defineProps<{
  id: number
  writer: string
  content: string
  time: Date
  reviewId: number
  isReply?: boolean
  commentHandler: () => void
}>()

const authStore = useAuthStore()

const startReply = ref(false)
const replyREF = ref<any | null>(null)

const timeString = computed(() => {
  return dayjs(props.time).format('YY.MM.DD HH:mm')
})

const endReplyHandler = () => {
  const ref = replyREF.value.inputREF as HTMLInputElement
  if (ref.innerText.length > 0) return
  startReply.value = false
  window.removeEventListener('click', endReplyHandler)
}

const replyHandler = () => {
  if (!replyREF.value) return
  startReply.value = true

  setTimeout(() => {
    const ref = replyREF.value.inputREF as HTMLInputElement
    ref.focus()
    ref.addEventListener('blur', endReplyHandler)
  }, 10)
}

const commentSubmitHandler = async (comment: string) => {
  try {
    if (!authStore.user) throw new Error()
    const { data } = await api.post(`/reviews/comments`, {
      userId: authStore.user.id,
      content: comment,
      reviewId: props.reviewId,
      parentId: props.id,
    })
    console.log(data)
    props.commentHandler()
    startReply.value = false
  } catch (err) {
    console.error(err)
  }
}
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
      <button
        class="hover:text-indigo-600 text-zinc-400"
        v-if="!props.isReply"
        @click="replyHandler"
      >
        <FontAwesomeIcon icon="fa-solid fa-reply" />
      </button>
    </div>
    <div class="p-1">
      <p>{{ props.content }}</p>
    </div>
  </li>
  <div
    v-show="!props.isReply && startReply"
    class="w-indent flex justify-start items-start gap-2"
  >
    <div class="w-9 h-9 flex justify-center items-center">
      <ProfileImg class="w-8 h-8" />
    </div>
    <CommentInput ref="replyREF" @onSubmit="commentSubmitHandler" />
  </div>
</template>
