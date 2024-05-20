<script setup lang="ts">
import Button from '@/components/ui/Button.vue'
import Comment from '@/components/ui/Comment.vue'
import CommentInput from '@/components/ui/CommentInput.vue'
import Like from '@/components/ui/Like.vue'
import Pagination from '@/components/ui/Pagination.vue'
import ProfileImg from '@/components/ui/ProfileImg.vue'
import { useAuthStore } from '@/stores/authStore'
import type { IBoardDetailResponse } from '@/types/Board'
import type { IComment, ICommentResponse } from '@/types/Comment'
import type { IResponse } from '@/types/Response'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { QuillEditor } from '@vueup/vue-quill'
import axios from 'axios'
import dayjs from 'dayjs'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

/*
TODO
api/boards/:id 요청하도록 수정
*/

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const pageIdx = ref(1)
const boardId = ref<number | null>(null)

const title = ref('')
const writer = ref('')
const updated = ref(new Date())
const content = ref('')
const likecount = ref(0)
const comments = ref<IComment[]>([])

const paginationHandler = (idx: number) => {
  pageIdx.value = idx
}

const editHandler = () => {
  router.push(`/boards/write/${boardId.value}`)
}

const commentSubmitHandler = async (comment: string) => {
  try {
    if (!authStore.user) throw new Error()
    const { data } = await axios.post(`/boards/comments`, {
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
    const { data } = await axios.get<IResponse<ICommentResponse[]>>(
      `/boards/comments/${boardId.value}`
    )

    const tmpComments: IComment[] = []
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

const axiosHandler = async () => {
  try {
    const userId = authStore.user?.id ?? null
    const { data } = await axios.get<IResponse<IBoardDetailResponse>>(
      `/boards/?id=${boardId.value}&writer=${userId}`
    )
    title.value = data.data.title
    writer.value = data.data.writer
    updated.value = new Date(data.data.regDate)
    content.value = data.data.content
    likecount.value = data.data.likecount
  } catch (err) {
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
  },
  { immediate: true }
)
</script>

<template>
  <main class="w-vw p-24 flex flex-col items-center">
    <!-- v:if isOwner == true -->
    <div class="w-full max-w-[800px] flex gap-2 pb-2">
      <Button @onClick="editHandler" type="light">수정</Button>
      <Button type="light">삭제</Button>
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
            <ProfileImg class="w-10 h-10" />
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

      <div
        class="flex justify-end items-center gap-3 text-xs text-zinc-600 pr-1"
      >
        <button class="flex items-center gap-1">
          <Like :value="false" />
          <p>좋아요</p>
          <p>{{ likecount }}</p>
        </button>
        <button class="flex items-center gap-1">
          <FontAwesomeIcon icon="fa-regular fa-comment" />
          <p>댓글</p>
          <p>17</p>
        </button>
      </div>

      <!-- Comment Section -->
      <section
        id="comment"
        class="pt-3 pb-3 text-sm text-zinc-600 flex flex-col gap-4"
      >
        <div class="flex justify-start items-start gap-2 pb-2 border-b">
          <div class="w-9 h-9 flex justify-center items-center">
            <ProfileImg class="w-8 h-8" />
          </div>
          <CommentInput @onSubmit="commentSubmitHandler" />
        </div>
        <ul class="flex flex-col items-end gap-2">
          <Comment
            :writer="e.writer"
            :content="e.content"
            :time="e.created"
            :isReply="e.isReply"
            v-for="e in comments"
          />
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
    </article>
  </main>
</template>
