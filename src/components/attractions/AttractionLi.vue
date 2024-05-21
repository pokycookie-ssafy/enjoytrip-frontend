<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import MutliImage from '@/components/ui/MutliImage.vue'
import Like from '@/components/ui/Like.vue'
import type { IAttraction } from '@/types/Attraction'
import AttractionCategoryLabel from '@/components/attractions/AttractionCategoryLabel.vue'
import AttractionStarRating from '@/components/attractions/AttractionStarRating.vue'
import ReviewPreviewCard from '@/components/attractions/ReviewPreviewCard.vue'
import AttractionMap from '@/components/attractions/AttractionMap.vue'
import type { IContentType } from '@/types/ContentType'
import Pagination from '../ui/Pagination.vue'
import Button from '../ui/Button.vue'
import { usePlanStore } from '@/stores/plan'
import areaCode from '@/assets/data/areaCode'
import contentType from '@/assets/data/contentType'

const props = defineProps<{
  data: IAttraction
}>()

const planStore = usePlanStore()

const reviewOpen = ref(false)

const sidoName = ref('')
const gugunName = ref('')
const type = ref<IContentType | null>(null)

const mockStarData = ref<number[]>([])
const pageIdx = ref(1)

const paginationHandler = (idx: number) => {
  pageIdx.value = idx
}

watch(
  () => props.data,
  () => {
    const sido = areaCode.find((e) => e.code === props.data.sidoCode)
    const gugun = sido?.details.find((e) => e.code === props.data.gugunCode)
    const content = contentType.find((e) => e.code === props.data.contentTypeId)

    sidoName.value = sido?.name ?? ''
    gugunName.value = gugun?.name ?? ''
    type.value = content ?? null
  },
  { immediate: true }
)

onMounted(() => {
  // 랜덤 별점 mock data
  const tmpArr = []
  for (let i = 0; i < 5; i++) tmpArr.push(1)
  for (let i = 0; i < 12; i++) tmpArr.push(2)
  for (let i = 0; i < 234; i++) tmpArr.push(3)
  for (let i = 0; i < 172; i++) tmpArr.push(4)
  for (let i = 0; i < 113; i++) tmpArr.push(5)
  for (let i = 0; i < 166; i++) tmpArr.push(6)
  for (let i = 0; i < 146; i++) tmpArr.push(7)
  for (let i = 0; i < 352; i++) tmpArr.push(8)
  for (let i = 0; i < 672; i++) tmpArr.push(9)
  for (let i = 0; i < 1212; i++) tmpArr.push(10)

  mockStarData.value = tmpArr
})
</script>

<template>
  <li
    class="w-full flex flex-col p-5 gap-5 text-sm text-zinc-500 rounded border shadow-sm relative"
  >
    <AttractionCategoryLabel class="right-4" :type="type" />
    <div class="flex flex-col gap-1">
      <h2 class="text-zinc-600 font-medium text-lg flex-1 ellipsis">
        {{ props.data.title }}
      </h2>
      <span class="flex justify-start items-center text-sm gap-1 font-light">
        <p class="hover:underline cursor-pointer">{{ sidoName }}</p>
        <p>/</p>
        <p class="hover:underline cursor-pointer">{{ gugunName }}</p>
      </span>
    </div>

    <div class="flex flex-col gap-2">
      <MutliImage
        :imgSrc="[props.data.firstImage]"
        v-if="props.data.firstImage.trim() !== ''"
      />
      <AttractionMap
        :locationName="props.data.addr1"
        :lat="props.data.latitude"
        :lng="props.data.longitude"
      />
      <AttractionStarRating :data="mockStarData" />
    </div>

    <div class="flex justify-between items-center">
      <div class="flex pl-1 pr-1 gap-5">
        <button
          class="flex justify-normal items-center gap-1 hover:text-indigo-600"
        >
          <Like :value="false" />
          <p class="text-xs">좋아요 (56)</p>
        </button>
        <button
          class="flex justify-normal items-center gap-1 hover:text-indigo-600 data-[open=true]:text-indigo-600 data-[open=true]:hover:text-indigo-500"
          @click="reviewOpen = !reviewOpen"
          :data-open="reviewOpen"
        >
          <FontAwesomeIcon icon="fa-regular fa-star" />
          <p class="text-xs">리뷰 (1624)</p>
        </button>
      </div>
      <Button @onClick="planStore.addAttraction(props.data)"
        >내 계획에 추가</Button
      >
    </div>

    <!-- comment section -->
    <section class="flex flex-col gap-2" v-show="reviewOpen">
      <ul class="flex flex-col gap-2">
        <ReviewPreviewCard v-for="i in 5" :key="i" />
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
  </li>
</template>
