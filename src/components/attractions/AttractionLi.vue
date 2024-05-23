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
import { useToastStore } from '@/stores/toast'
import { api } from '@/axios.config'
import { useAuthStore } from '@/stores/authStore'
import type { IResponse } from '@/types/Response'
import type { IReviewPreview, IReviewResponse } from '@/types/Review'

const props = defineProps<{
  data: IAttraction
}>()

const authStore = useAuthStore()
const { addToast } = useToastStore()

const planStore = usePlanStore()
const toast = useToastStore()

const reviewOpen = ref(false)

const sidoName = ref('')
const gugunName = ref('')
const type = ref<IContentType | null>(null)

const reviews = ref<IReviewPreview[]>([])
const reviewCount = ref(props.data.reviews)
const pageIdx = ref(1)

const like = ref(false)
const likecount = ref(0)

// const likeHandler = async () => {
//   if (!authStore.user) {
//     addToast('먼저 로그인 해주세요', 'danger')
//     return
//   }

//   try {
//     const { data } = await api.post(`attractions/likes`, {
//       boardId: props.data.contentId,
//       userId: authStore.user.id,
//     })
//     console.log(data)
//     like.value = data.data
//     likecount.value = data.cnt
//   } catch (error) {
//     console.error(error)
//   }
// }

const reviewFetchHandler = async () => {
  try {
    const { data } = await api.get<IResponse<IReviewResponse>>(
      `/reviews/${props.data.contentId}?page=${pageIdx.value - 1}`
    )
    if ((data as any).message) {
      return
    }
    console.log(data)
    reviewCount.value = data.data.numberOfElements
    reviews.value = data.data.content.map((e) => {
      return {
        reviewId: e.review_id,
        writer: e.writer,
        writerImage: e.writer_image,
        time: new Date(e.review_date),
        content: e.review_content,
        point: e.point,
      }
    })
  } catch (error) {
    console.error(error)
  }
}

const reviewOpenHandler = () => {
  reviewOpen.value = !reviewOpen.value
  if (reviewOpen.value) reviewFetchHandler()
}

const paginationHandler = (idx: number) => {
  pageIdx.value = idx
}

const addHandler = async () => {
  try {
    if (!planStore.plan?.id) {
      toast.addToast('계획을 먼저 선택해주세요', 'danger')
      return
    }

    const { data } = await api.post('/plans/candidates', {
      plan_id: planStore.plan.id,
      content_id: props.data.contentId,
    })
    console.log(data)
    if (data.status === 'success') planStore.addAttraction(props.data)
  } catch (err) {
    console.error(err)
  }
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
        <p class="hover:underline cursor-pointer ellipsis">{{ sidoName }}</p>
        <p>/</p>
        <p class="hover:underline cursor-pointer ellipsis">{{ gugunName }}</p>
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
      <AttractionStarRating
        :rate="props.data.point"
        :count="props.data.reviews"
      />
    </div>

    <div class="flex justify-between gap-2 items-center">
      <div class="flex pl-1 pr-1 gap-5">
        <!-- <button
          class="flex justify-normal items-center gap-1 hover:text-red-600"
          @click="likeHandler"
        >
          <Like :value="like" />
          <p class="text-xs ellipsis">좋아요 ({{ likecount }})</p>
        </button> -->
        <button
          class="flex justify-normal items-center gap-1 hover:text-indigo-600 data-[open=true]:text-indigo-600 data-[open=true]:hover:text-indigo-500"
          @click="reviewOpenHandler"
          :data-open="reviewOpen"
        >
          <FontAwesomeIcon icon="fa-regular fa-star" />
          <p class="text-xs ellipsis">리뷰 ({{ reviewCount }})</p>
        </button>
      </div>
      <Button class="ellipsis" @onClick="addHandler">내 계획에 추가</Button>
    </div>

    <!-- comment section -->
    <section class="flex flex-col gap-2" v-show="reviewOpen">
      <ul class="flex flex-col gap-2">
        <div
          class="mt-3 mb-3 w-full h-36 flex flex-col justify-center items-center border rounded text-zinc-500"
          v-if="reviewCount === 0"
        >
          <FontAwesomeIcon
            class="text-3xl mb-3"
            icon="fa-regular fa-face-sad-tear"
          />
          <p class="ellipsis">아무 리뷰도 없어요</p>
          <p class="ellipsis">첫 리뷰를 남겨보세요!</p>
        </div>
        <ReviewPreviewCard
          :reviewId="e.reviewId"
          :writer="e.writer"
          :writerImage="e.writerImage"
          :time="e.time"
          :content="e.content"
          :point="e.point"
          v-for="(e, i) in reviews"
          :key="i"
        />
      </ul>
      <div class="w-full flex justify-center" v-if="reviewCount > 15">
        <Pagination
          :idx="pageIdx"
          :countPerPage="15"
          :totalCount="reviewCount"
          @onClick="paginationHandler"
          @onPrev="paginationHandler"
          @onNext="paginationHandler"
        />
      </div>
    </section>
  </li>
</template>
