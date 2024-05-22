<script setup lang="ts">
import { api } from '@/axios.config'
import ReviewLi from '@/components/reviews/ReviewLi.vue'
import Pagination from '@/components/ui/Pagination.vue'
import type { IReview } from '@/types/Review'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ref } from 'vue'

const pageIdx = ref(1)
const totalCount = ref(1)
const reviews = ref<IReview[]>([])

const fetchReviews = async () => {
  try {
    const { data } = await api.get('/')
    console.log(data)
  } catch (err) {
    console.error(err)
  }
}

const paginationHandler = (idx: number) => {
  pageIdx.value = idx
}
</script>

<template>
  <section class="flex-1 flex justify-center overflow-y-auto">
    <div class="flex flex-col gap-8 w-full max-w-[800px] h-fit pt-24 p-14">
      <ul
        class="flex flex-col gap-4 flex-1 overflow-hidden pt-1 relative -top-1"
      >
        <div
          class="mt-3 mb-3 w-full h-36 flex flex-col gap-3 justify-center items-center border rounded text-zinc-500 border-zinc-300"
          v-if="reviews.length === 0"
        >
          <FontAwesomeIcon
            class="text-3xl"
            icon="fa-regular fa-face-sad-tear"
          />
          <p class="ellipsis">내가 좋아요 한 리뷰가 없어요</p>
        </div>
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
        />
      </ul>
      <div class="w-full flex justify-center items-center mt-10">
        <Pagination
          v-if="reviews.length > 15"
          :idx="pageIdx"
          :countPerPage="15"
          :totalCount="totalCount"
          @onClick="paginationHandler"
          @onPrev="paginationHandler"
          @onNext="paginationHandler"
        />
      </div>
    </div>
  </section>
</template>
