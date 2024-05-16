<script setup lang="ts">
import Modal from '@/components/modal/Modal.vue'
import AttractionModal from '@/components/modal/AttractionModal.vue'
import AttractionLi from '@/components/ui/AttractionLi.vue'
import AttractionNav from '@/components/ui/AttractionNav.vue'
import type { IAttraction } from '@/types/Attraction'
import { onMounted, ref } from 'vue'
import axios from 'axios'

const mockAttraction = ref<IAttraction[]>([])

const isOpen = ref(false)

onMounted(async () => {
  const { data } = await axios<IAttraction>('/api/attraction.json')
  mockAttraction.value = [data, data, data, data, data]
})
</script>

<template>
  <main class="w-vw p-24 flex justify-center">
    <section class="flex gap-4 w-full max-w-[800px]">
      <AttractionNav class="md:flex hidden" />
      <ul class="flex flex-col gap-4 flex-1">
        <AttractionLi v-for="attraction in mockAttraction" :data="attraction" />
      </ul>
    </section>
  </main>
  <Modal :show="isOpen" @autoClose="isOpen = false">
    <AttractionModal />
  </Modal>
</template>
