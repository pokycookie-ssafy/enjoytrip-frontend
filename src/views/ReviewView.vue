<script setup lang="ts">
import ReviewLi from '@/components/ui/ReviewLi.vue'
import ReviewNav from '@/components/ui/ReviewNav.vue'

const mock = [
  {
    writer: 'user1',
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    imgSrc: ['/mock/img/test.jpg'],
    time: new Date(),
  },
  {
    writer: 'user1',
    content: 'hello',
    imgSrc: ['/mock/img/test.jpg', '/mock/img/test2.jpg'],
    time: new Date(),
  },
  {
    writer: 'user1',
    content: 'hello',
    imgSrc: [
      '/mock/img/test.jpg',
      '/mock/img/test2.jpg',
      '/mock/img/test3.jpg',
    ],
    time: new Date(),
  },
  {
    writer: 'user1',
    content: 'hello',
    imgSrc: [
      '/mock/img/test.jpg',
      '/mock/img/test2.jpg',
      '/mock/img/test3.jpg',
      '/mock/img/test4.jpg',
    ],
    time: new Date(),
  },
  {
    writer: 'user1',
    content: 'hello',
    imgSrc: [
      '/mock/img/test.jpg',
      '/mock/img/test2.jpg',
      '/mock/img/test3.jpg',
      '/mock/img/test4.jpg',
      '/mock/img/test.jpg',
    ],
    time: new Date(),
  },
]
</script>

<template>
  <main class="w-vw p-24 flex justify-center">
    <section class="flex gap-4 w-full max-w-[800px]">
      <ReviewNav class="md:flex hidden" />
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
