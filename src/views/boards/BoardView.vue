<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { IBoard, IBoardResponse } from '@/types/Board'
import BoardLi from '@/components/boards/BoardLi.vue'
import BoardNav from '@/components/boards/BoardNav.vue'
import Pagination from '@/components/ui/Pagination.vue'
import type { IResponse } from '@/types/Response'
import { api } from '@/axios.config'

const route = useRoute()
const router = useRouter()

const pageIdx = ref(1)
const boards = ref<IBoard[]>([])
const notices = ref<IBoard[]>([])
const totalCount = ref(1)

const getData = async () => {
  try {
    const { data } = await api.get<IResponse<IBoardResponse>>(
      `/boards?page=${pageIdx.value - 1}&size=${15}`
    )
    // const { data: noticeData } = await axios.get<IBoard[]>('/notices.json')

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

    // const tmpNotice: IBoard[] = []
    // noticeData.forEach((e) => {
    //   tmpNotice.push({ ...e, updated: new Date(e.updated) })
    // })
    // notices.value = tmpNotice
  } catch (err) {
    console.error(err)
  }
}

const paginationHandler = (idx: number) => {
  const query = idx === 1 ? undefined : { page: idx }
  router.push({ name: 'board', query })
}

watch(
  () => route.query,
  (query) => {
    try {
      pageIdx.value = parseInt((query?.page ?? '1') as string)
    } catch (err) {
      pageIdx.value = 1
    }
    getData()
  },
  { immediate: true }
)
</script>

<template>
  <main class="w-vw p-24 flex justify-center">
    <section class="flex flex-col w-full max-w-[800px]">
      <BoardNav />
      <ul class="flex flex-col flex-1 overflow-hidden divide-y border-b">
        <BoardLi v-for="e in notices" :data="e" isNotice />
        <BoardLi v-for="e in boards" :data="e" />
      </ul>
      <div class="w-full flex justify-end items-center pt-2 pb-2">
        <RouterLink
          class="rounded transition-colors text-white p-2 pl-4 pr-4 text-sm bg-indigo-600 hover:bg-indigo-500"
          :to="{ name: 'newBoard' }"
          >글쓰기</RouterLink
        >
      </div>
      <div class="w-full flex justify-center items-center mt-14">
        <Pagination
          :idx="pageIdx"
          :countPerPage="15"
          :totalCount="totalCount"
          @onClick="paginationHandler"
          @onPrev="paginationHandler"
          @onNext="paginationHandler"
        />
      </div>
    </section>
  </main>
</template>
