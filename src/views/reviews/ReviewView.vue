<script setup lang="ts">
import AttractionNav from '@/components/attractions/AttractionNav.vue'
import ReviewLi from '@/components/reviews/ReviewLi.vue'
import axios from 'axios'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const reviews = ref([])
const pageIdx = ref(0)

const filterHandler = (query: string) => {
  router.push(`/attractions?${query}`)
}

const fetchReviews = async () => {
  let query = route.fullPath.replace(route.path, '')
  if (query.trim() === '') query = `?page=${pageIdx.value}&size=${15}`
  else query = `${query}&page=${pageIdx.value}&size=${15}`

  try {
    // const { data } = await axios.get(
    //   `/reviews${query}`
    // )
    // reviews.value = [...reviews.value, ...data.data.content]
    // pageIdx.value++
    // console.log(data)
  } catch (err) {}
}

watch(
  () => route.fullPath,
  () => {
    pageIdx.value = 0
    reviews.value = []
  },
  { immediate: true }
)

const mock = [
  {
    writer: 'user1',
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    imgSrc: ['/file/review/test.jpg'],
    time: new Date(),
  },
  {
    writer: 'user1',
    content: 'hello',
    imgSrc: ['/file/review/test.jpg', '/file/review/test2.jpg'],
    time: new Date(),
  },
  {
    writer: 'user1',
    content: 'hello',
    imgSrc: [
      '/file/review/test.jpg',
      '/file/review/test2.jpg',
      '/file/review/test3.jpg',
    ],
    time: new Date(),
  },
  {
    writer: 'user1',
    content: 'hello',
    imgSrc: [
      '/file/review/test.jpg',
      '/file/review/test2.jpg',
      '/file/review/test3.jpg',
      '/file/review/test4.jpg',
    ],
    time: new Date(),
  },
  {
    writer: 'user1',
    content: 'hello',
    imgSrc: [
      '/file/review/test.jpg',
      '/file/review/test2.jpg',
      '/file/review/test3.jpg',
      '/file/review/test4.jpg',
      '/file/review/test.jpg',
    ],
    time: new Date(),
  },
]
</script>

<template>
  <main class="w-vw p-24 flex justify-center">
    <section class="flex gap-4 w-full max-w-[800px]">
      <AttractionNav class="md:flex hidden" @onSubmit="filterHandler" />
      <ul class="flex flex-col gap-4 flex-1">
        <ReviewLi
          v-for="e in mock"
          :writer="e.writer"
          :content="e.content"
          :imgSrc="e.imgSrc"
          :time="e.time"
        />
      </ul>
    </section>
  </main>
</template>
