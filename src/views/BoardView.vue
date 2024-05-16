<script setup lang="ts">
import BoardLi from '@/components/ui/BoardLi.vue'
import BoardNav from '@/components/ui/BoardNav.vue'
import Pagination from '@/components/ui/Pagination.vue'
import type { IBoard } from '@/types/Board'
import axios from 'axios'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const pageIdx = ref(1)
const boards = ref<IBoard[]>([])
const notices = ref<IBoard[]>([])

const getData = async () => {
  try {
    const { data: boardData } = await axios.get<IBoard[]>('/api/boards.json')
    const { data: noticeData } = await axios.get<IBoard[]>('/api/notices.json')

    const tmpBoard: IBoard[] = []
    boardData.forEach((e) => {
      tmpBoard.push({ ...e, updated: new Date(e.updated) })
    })
    boards.value = tmpBoard

    const tmpNotice: IBoard[] = []
    noticeData.forEach((e) => {
      tmpNotice.push({ ...e, updated: new Date(e.updated) })
    })
    notices.value = tmpNotice
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
      <ul class="flex flex-col flex-1 overflow-hidden divide-y">
        <BoardLi v-for="e in notices" :data="e" isNotice />
        <BoardLi v-for="e in boards" :data="e" />
      </ul>
      <div class="w-full flex justify-center items-center mt-14">
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
  </main>
</template>
