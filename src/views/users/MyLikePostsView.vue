<script setup lang="ts">
import { api } from '@/axios.config'
import Pagination from '@/components/ui/Pagination.vue'
import type { IBoard, IBoardResponse } from '@/types/Board'
import type { IResponse } from '@/types/Response'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import dayjs from 'dayjs'
import { onMounted, ref } from 'vue'

const pageIdx = ref(1)
const totalCount = ref(1)
const boards = ref<IBoard[]>([])

const paginationHandler = (idx: number) => {
  pageIdx.value = idx
  fetchData()
}

const fetchData = async () => {
  try {
    const { data } = await api.get<IResponse<IBoardResponse>>(
      `/users/boards/like?page=${pageIdx.value - 1}`
    )
    console.log(data)

    const boardData = data.data.content
    const tmpBoard: IBoard[] = []
    boardData.forEach((e: any) => {
      tmpBoard.push({
        id: e.id,
        title: e.title,
        writer: e.writer,
        content: e.content,
        updated: new Date(e.regDate),
        readCount: e.readcount,
        likeCount: e.likecount,
        isOwner: true,
      })
    })
    boards.value = tmpBoard

    totalCount.value = data.data.totalElements
  } catch (err) {
    console.error(err)
  }
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <section class="flex-1 flex justify-center overflow-y-auto">
    <div class="flex flex-col w-full max-w-[800px] h-fit pt-24 p-14">
      <div
        class="flex justify-between items-center pl-1 pr-1 pt-3 pb-3 gap-3 text-xs font-semibold text-zinc-700 border-b border-zinc-300"
      >
        <p class="flex-1 ellipsis">제목</p>
        <p class="w-24 ellipsis">작성자</p>
        <p class="w-12 ellipsis text-center">작성일</p>
        <p class="w-12 ellipsis text-center">조회수</p>
        <p class="w-12 ellipsis text-center">좋아요</p>
      </div>

      <ul class="flex flex-col border-b border-zinc-300">
        <div
          class="mt-3 mb-3 w-full h-36 flex flex-col gap-3 justify-center items-center border rounded text-zinc-500 border-zinc-300"
          v-if="boards.length === 0"
        >
          <FontAwesomeIcon
            class="text-3xl"
            icon="fa-regular fa-face-sad-tear"
          />
          <p class="ellipsis">내가 좋아요 한 글이 없어요</p>
        </div>
        <li
          class="flex justify-between items-center pl-1 pr-1 pt-3 pb-3 gap-3 text-xs text-zinc-700"
          v-for="(e, i) in boards"
          :key="i"
        >
          <RouterLink
            class="flex-1 ellipsis text-sm hover:underline"
            :to="`/boards/${e.id}`"
          >
            {{ e.title }}
          </RouterLink>
          <p class="w-12 ellipsis text-center">
            {{ dayjs(e.updated).format('YY.MM.DD') }}
          </p>
          <p class="w-24 ellipsis">{{ e.writer }}</p>
          <p class="w-12 ellipsis text-center">{{ e.readCount }}</p>
          <p class="w-12 ellipsis text-center">{{ e.likeCount }}</p>
        </li>
      </ul>
      <div class="w-full flex justify-center items-center mt-10">
        <Pagination
          v-if="totalCount > 15"
          :idx="pageIdx"
          :countPerPage="15"
          :totalCount="totalCount"
          @onClick="paginationHandler"
          @onPrev="paginationHandler"
          @onNext="paginationHandler"
        />
      </div>
    </div>
  </section>
</template>
