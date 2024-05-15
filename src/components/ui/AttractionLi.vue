<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import MutliImage from './MutliImage.vue'
import Like from './Like.vue'
import Comment from './Comment.vue'
import type { IAttraction } from '@/types/Attraction'
import axios from 'axios'
import type { ISido } from '@/types/SidoGugun'
import AttractionCategoryLabel from './AttractionCategoryLabel.vue'
import AttractionStarRating from './AttractionStarRating.vue'
import type { IContentType } from '@/types/contentType'
import ReviewPreviewCard from './ReviewPreviewCard.vue'
import AttractionMap from './AttractionMap.vue'

const props = defineProps<{
  data: IAttraction
}>()

const reviewOpen = ref(false)

const sidoName = ref('')
const gugunName = ref('')
const icon = ref<string | null>(null)

const mockStarData = ref<number[]>([])

watch(
  () => props.data,
  async () => {
    const { data: area } = await axios.get<ISido[]>('/areaCode.json')
    const { data: category } = await axios.get<IContentType[]>(
      '/contentType.json'
    )

    const sido = area.find((e) => e.code === props.data.sidoCode)
    const gugun = sido?.details.find((e) => e.code === props.data.gugunCode)
    const content = category.find((e) => e.code === props.data.contentType)

    sidoName.value = sido?.name ?? ''
    gugunName.value = gugun?.name ?? ''
    icon.value = content?.icon ?? ''
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
    <AttractionCategoryLabel :icon="icon" />
    <div class="flex justify-between items-start">
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
    </div>

    <div class="flex flex-col gap-2">
      <MutliImage :imgSrc="[props.data.image1]" />
      <AttractionMap
        :locationName="props.data.addr1"
        :lat="props.data.latitude"
        :lng="props.data.longitude"
      />
      <AttractionStarRating :data="mockStarData" />
    </div>

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

    <!-- comment section -->
    <section class="flex flex-col gap-2" v-show="reviewOpen">
      <ul class="flex flex-col gap-2">
        <ReviewPreviewCard v-for="i in 5" :key="i" />
      </ul>
    </section>
  </li>
</template>
