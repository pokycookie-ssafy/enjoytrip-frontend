<script setup lang="ts">
import type { IAttraction } from '@/types/Attraction'
import AttractionCategoryLabel from '../attractions/AttractionCategoryLabel.vue'
import { computed } from 'vue'
import contentType from '@/assets/data/contentType'
import { usePlanStore } from '@/stores/plan'
import { api } from '@/axios.config'

const props = defineProps<{
  data: IAttraction
  index: number
}>()

const planStore = usePlanStore()

const type = computed(() => {
  return contentType.find((e) => e.code === props.data.contentTypeId) ?? null
})

const deleteHandler = async () => {
  try {
    if (!planStore.plan?.id) return

    const planId = planStore.plan.id
    const attractionId = props.data.contentId

    const { data } = await api.delete(
      `/plans/candidates?id=${planId}&content_id=${attractionId}`
    )
    console.log(data)
    if (data.status === 'success') planStore.removeAttraction(props.index)
  } catch (err) {
    console.error(err)
  }
}
</script>

<template>
  <div class="overflow-hidden pt-1 shrink-0">
    <div
      class="relative border rounded p-2 w-full bg-zinc-100 border-zinc-200 text-zinc-800"
    >
      <!-- <CheckBox class="mb-2" :value="true" /> -->
      <p class="ellipsis mb-1">{{ props.data.title }}</p>
      <p class="ellipsis text-xs text-zinc-700 mb-4">{{ props.data.addr1 }}</p>
      <div class="flex justify-end items-center gap-2 text-zinc-600 text-xs">
        <RouterLink
          class="hover:underline ellipsis"
          :to="`/attractions?id=${props.data.contentId}`"
          >세부내용</RouterLink
        >
        <button class="hover:underline ellipsis" @click="deleteHandler">
          삭제
        </button>
        <!-- <FontAwesomeIcon icon="fa-regular fa-eye" /> -->
      </div>
      <AttractionCategoryLabel class="right-2" :type="type" />
    </div>
  </div>
</template>
