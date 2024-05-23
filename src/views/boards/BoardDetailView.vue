<script setup lang="ts">
import { api } from '@/axios.config'
import Button from '@/components/ui/Button.vue'
import Comment from '@/components/ui/Comment.vue'
import CommentInput from '@/components/ui/CommentInput.vue'
import Like from '@/components/ui/Like.vue'
import MutliImage from '@/components/ui/MutliImage.vue'
import Pagination from '@/components/ui/Pagination.vue'
import ProfileImg from '@/components/ui/ProfileImg.vue'
import { useAuthStore } from '@/stores/authStore'
import { useToastStore } from '@/stores/toast'
import type { IBoardDetailResponse } from '@/types/Board'
import type { IComment, ICommentResponse } from '@/types/Comment'
import type { IResponse, IResponseC } from '@/types/Response'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { QuillEditor } from '@vueup/vue-quill'
import dayjs from 'dayjs'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const { addToast } = useToastStore()

const pageIdx = ref(1)
const boardId = ref<number | null>(null)

const title = ref('')
const writer = ref('')
const updated = ref(new Date())
const content = ref('')
const likecount = ref(0)
const like = ref(false)
const comments = ref<IComment[]>([])
const isOwner = ref(false)
const commentCnt = ref(1)
const images = ref<string[]>([])
const writerImage = ref<string | null>(null)

const likeHandler = async () => {
  if (!boardId.value) return
  if (!authStore.user) {
    addToast('먼저 로그인 해주세요', 'danger')
    return
  }
  try {
    const { data } = await api.post(`boards/likes`, {
      boardId: boardId.value,
      userId: authStore.user.id,
    })
    console.log(data)
    like.value = data.data
    likecount.value = data.cnt
  } catch (error) {
    console.error(error)
  }
}

const paginationHandler = (idx: number) => {
  pageIdx.value = idx
  commentHandler()
}

const editHandler = () => {
  router.push(`/boards/write/${boardId.value}`)
}

const deleteHandler = async () => {
  try {
    const { data } = await api.delete(`/boards?id=${boardId.value}`)
    console.log(data)
    router.push({ name: 'board' })
  } catch (err) {
    console.error(err)
  }
}

const commentSubmitHandler = async (comment: string) => {
  try {
    if (!authStore.user) throw new Error()
    const { data } = await api.post(`/boards/comments`, {
      userId: authStore.user.id,
      content: comment,
      boardId: boardId.value,
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
    const { data } = await api.get<IResponseC<ICommentResponse>>(
      `/boards/comments/${boardId.value}?page=${pageIdx.value - 1}`
    )
    console.log(data)
    commentCnt.value = data.data.totalElements
    const tmpComments: IComment[] = []
    data.data.content.forEach((e) => {
      tmpComments.push({
        id: e.id,
        writer: e.writer,
        writer_image: e.writer_image,
        content: e.content,
        created: new Date(e.commentCreatedDate),
        isReply: false,
      })
      e.commentList.forEach((e) => {
        tmpComments.push({
          id: e.id,
          writer: e.writer,
          writer_image: e.writer_image,
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

const axiosHandler = async () => {
  try {
    const userId = authStore.user?.id ?? null
    let url = `/boards/?id=${boardId.value}`
    if (userId) url += `&writer=${userId}`
    const { data } = await api.get<IResponse<IBoardDetailResponse>>(url)
    console.log(data)
    title.value = data.data.title
    writer.value = data.data.writer
    updated.value = new Date(data.data.regDate)
    content.value = data.data.content
    likecount.value = data.data.likecount
    isOwner.value = data.data.mine
    images.value = data.data.images
    like.value = data.data.like
    writerImage.value = data.data.writer_image
  } catch (err) {
    router.push({ name: 'board' })
    console.error(err)
  }
}

watch(
  () => route.params,
  (params) => {
    if (!params?.id) boardId.value = null
    else if (Array.isArray(params.id)) boardId.value = null
    else {
      const id = parseInt(params.id)
      boardId.value = isNaN(id) ? null : id
      if (boardId.value) {
        axiosHandler()
        commentHandler()
      }
    }

    if (!boardId.value) router.push({ name: 'board' })
  },
  { immediate: true }
)
</script>

<template>
  <main class="w-vw p-24 flex flex-col items-center">
    <div v-if="isOwner" class="w-full max-w-[800px] flex gap-2 pb-2">
      <Button @onClick="editHandler" type="light">수정</Button>
      <Button type="light" @onClick="deleteHandler">삭제</Button>
    </div>
    <article class="flex flex-col w-full max-w-[800px] rounded border p-4">
      <section class="p-3 flex flex-col gap-2 border-b">
        <RouterLink
          class="hover:underline text-zinc-600 text-sm"
          :to="{ name: 'board' }"
          >자유게시판</RouterLink
        >
        <h2 class="text-zinc-800 text-2xl font-semibold pb-2">{{ title }}</h2>
        <div class="flex justify-between items-end">
          <div class="flex items-center gap-2">
            <ProfileImg class="w-10 h-10" :src="writerImage" />
            <span class="flex flex-col justify-center">
              <h2 class="h-5 flex items-center text-zinc-600">{{ writer }}</h2>
              <p class="h-5 flex items-center text-xs text-zinc-400 font-light">
                {{ dayjs(updated).format('YYYY.MM.DD HH:mm') }}
              </p>
            </span>
          </div>
          <div
            class="flex justify-end items-center text-xs text-zinc-600 gap-3"
          >
            <button class="flex items-center gap-1">
              <FontAwesomeIcon icon="fa-regular fa-comment" />
              <p>댓글</p>
              <p>17</p>
            </button>
            <button>URL 복사</button>
          </div>
        </div>
      </section>
      <section class="no-border">
        <QuillEditor
          theme="snow"
          readOnly
          :content="content"
          contentType="html"
          :options="{ modules: { toolbar: false } }"
        />
      </section>
      <div class="mt-2 mb-4">
        <MutliImage :imgSrc="images" v-if="images.length > 0" />
      </div>

      <div
        class="flex justify-end items-center gap-3 text-xs text-zinc-600 pr-1"
      >
        <button
          class="flex items-center gap-1 hover:text-red-600"
          @click="likeHandler"
        >
          <Like :value="like" />
          <p>좋아요</p>
          <p>{{ likecount }}</p>
        </button>
        <button class="flex items-center gap-1">
          <FontAwesomeIcon icon="fa-regular fa-comment" />
          <p>댓글</p>
          <p>{{ commentCnt }}</p>
        </button>
      </div>

      <!-- Comment Section -->
      <section
        id="comment"
        class="pt-3 pb-3 text-sm text-zinc-600 flex flex-col gap-4"
      >
        <div
          class="flex justify-start items-start gap-2 pb-2 border-b"
          v-if="authStore.user"
        >
          <div class="w-9 h-9 flex justify-center items-center">
            <ProfileImg class="w-8 h-8" :src="authStore.user?.profileImage" />
          </div>
          <CommentInput @onSubmit="commentSubmitHandler" />
        </div>
        <ul v-if="boardId" class="flex flex-col items-end gap-2">
          <div
            class="mt-3 mb-3 w-full h-36 flex flex-col justify-center items-center border rounded text-zinc-500"
            v-if="commentCnt === 0"
          >
            <FontAwesomeIcon
              class="text-3xl mb-3"
              icon="fa-regular fa-face-sad-tear"
            />
            <p class="ellipsis">아무 댓글도 없어요</p>
            <p class="ellipsis">첫 댓글을 남겨보세요!</p>
          </div>
          <Comment
            :id="e.id"
            :writer="e.writer"
            :writerImage="e.writer_image"
            :content="e.content"
            :time="e.created"
            :isReply="e.isReply"
            :boardId="boardId"
            :commentHandler="commentHandler"
            v-for="e in comments"
          />
        </ul>
        <div class="w-full flex justify-center" v-if="commentCnt > 15">
          <Pagination
            :idx="pageIdx"
            :countPerPage="15"
            :totalCount="commentCnt"
            @onClick="paginationHandler"
            @onPrev="paginationHandler"
            @onNext="paginationHandler"
          />
        </div>
      </section>
    </article>
  </main>
</template>
