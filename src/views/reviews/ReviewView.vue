<script setup lang="ts">
import { api } from '@/axios.config'
import AttractionNav from '@/components/attractions/AttractionNav.vue'
import ReviewLi from '@/components/reviews/ReviewLi.vue'
import type { IResponse } from '@/types/Response'
import type { IReview, IReviewResponse } from '@/types/Review'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const reviews = ref<IReview[]>([])
const pageIdx = ref(0)

const filterHandler = (query: string) => {
  router.push(`/reviews?${query}`)
}

const fetchReviews = async () => {
  let query = route.fullPath.replace(route.path, '')
  if (query.trim() === '') query = `?page=${pageIdx.value}&size=${15}`
  else query = `${query}&page=${pageIdx.value}&size=${15}`

  try {
    const { data } = await api.get<IResponse<IReviewResponse>>(
      `/reviews${query}`
    )
    const fetchedReviews: IReview[] = data.data.content.map((e) => {
      return { ...e, review_date: new Date(e.review_date) }
    })
    reviews.value = [...reviews.value, ...fetchedReviews]
    pageIdx.value++
    console.log(data)
  } catch (err) {}
}

watch(
  () => route.fullPath,
  () => {
    pageIdx.value = 0
    reviews.value = []
    fetchReviews()
  },
  { immediate: true }
)
</script>

<template>
  <main class="w-vw p-24 flex justify-center">
    <section class="flex gap-4 w-full max-w-[800px]">
      <AttractionNav class="md:flex hidden" @onSubmit="filterHandler" />
      <ul class="flex flex-col gap-4 flex-1">
        <ReviewLi
          v-for="e in reviews"
          :writer="e.writer"
          :content="e.review_content"
          :imgSrc="e.images"
          :time="e.review_date"
          :attraction="e.attractionDto"
          :point="e.point"
          :profile="e.writer_image"
          :reviewId="e.review_id"
          :like="e.like"
          :likecount="e.likecount"
        />
      </ul>
      <InfiniteScroll v-if="pageIdx > 0" @onObserve="fetchReviews" />
    </section>
  </main>
</template>
