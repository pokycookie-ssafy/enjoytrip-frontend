<script setup lang="ts">
import Modal from '@/components/modal/Modal.vue'
import AttractionModal from '@/components/modal/AttractionModal.vue'
import AttractionLi from '@/components/attractions/AttractionLi.vue'
import AttractionNav from '@/components/attractions/AttractionNav.vue'
import type { IAttraction, IAttractionResponse } from '@/types/Attraction'
import { ref, watch } from 'vue'
import InfiniteScroll from '@/components/ui/InfiniteScroll.vue'
import type { IResponse } from '@/types/Response'
import { useRoute, useRouter } from 'vue-router'
import { api } from '@/axios.config'

const route = useRoute()
const router = useRouter()

// const mockAttraction = ref<IAttraction[]>([])
const attractions = ref<IAttraction[]>([])
const pageIdx = ref(0)
const isOpen = ref(false)

const filterHandler = (query: string) => {
  router.push(`/attractions?${query}`)
}

const fetchAttractions = async () => {
  // const { data } = await axios<IAttraction[]>('/api/attraction.json')
  // console.log(data)
  // mockAttraction.value = [...mockAttraction.value, ...data]

  let query = route.fullPath.replace(route.path, '')
  if (query.trim() === '') query = `?page=${pageIdx.value}&size=${15}`
  else query = `${query}&page=${pageIdx.value}&size=${15}`

  try {
    const { data } = await api.get<IResponse<IAttractionResponse>>(
      `/attractions${query}`
    )
    console.log(data)
    attractions.value = [...attractions.value, ...data.data.content]
    pageIdx.value++
  } catch (err) {
    console.error(err)
  }
}

watch(
  () => route.fullPath,
  () => {
    attractions.value = []
    pageIdx.value = 0
    fetchAttractions()
  },
  { immediate: true }
)
</script>

<template>
  <main class="w-vw p-24 flex justify-center">
    <section class="flex gap-4 w-full max-w-[800px]">
      <AttractionNav class="md:flex hidden" @onSubmit="filterHandler" />
      <ul
        class="flex flex-col gap-4 flex-1 overflow-hidden pt-1 relative -top-1"
      >
        <AttractionLi v-for="attraction in attractions" :data="attraction" />
        <InfiniteScroll v-if="pageIdx > 0" @onObserve="fetchAttractions" />
      </ul>
    </section>
  </main>
  <Modal :show="isOpen" @autoClose="isOpen = false">
    <AttractionModal />
  </Modal>
</template>
