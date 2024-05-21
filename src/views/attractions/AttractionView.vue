<script setup lang="ts">
import Modal from '@/components/modal/Modal.vue'
import AttractionModal from '@/components/modal/AttractionModal.vue'
import AttractionLi from '@/components/attractions/AttractionLi.vue'
import AttractionNav from '@/components/attractions/AttractionNav.vue'
import type { IAttraction, IAttractionResponse } from '@/types/Attraction'
import { ref } from 'vue'
import axios from 'axios'
import InfiniteScroll from '@/components/ui/InfiniteScroll.vue'
import type { IResponse } from '@/types/Response'

const mockAttraction = ref<IAttraction[]>([])
const attractions = ref<IAttraction[]>([])

const isOpen = ref(false)
const pageIdx = ref(0)

const fetchAttractions = async () => {
  // const { data } = await axios<IAttraction>('/api/attraction.json')
  // mockAttraction.value = [...mockAttraction.value, data, data, data, data, data]
  try {
    const { data } = await axios<IResponse<IAttractionResponse>>(
      `/attractions?page=${pageIdx.value}&size=${15}`
    )
    attractions.value = [...attractions.value, ...data.data.content]
    console.log(data)
    pageIdx.value++
  } catch (err) {}
}
</script>

<template>
  <main class="w-vw p-24 flex justify-center">
    <section class="flex gap-4 w-full max-w-[800px]">
      <AttractionNav class="md:flex hidden" />
      <ul class="flex flex-col gap-4 flex-1 overflow-hidden">
        <AttractionLi v-for="attraction in attractions" :data="attraction" />
        <InfiniteScroll @onObserve="fetchAttractions" />
      </ul>
    </section>
  </main>
  <Modal :show="isOpen" @autoClose="isOpen = false">
    <AttractionModal />
  </Modal>
</template>
