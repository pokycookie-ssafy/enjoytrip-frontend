<script setup lang="ts">
import BoardLi from '@/components/ui/BoardLi.vue'
import BoardNav from '@/components/ui/BoardNav.vue'

interface IBoard {
  title: string
  writer: string
  register: Date
  isNotice: boolean
}

const data: IBoard[] = [
  {
    title:
      'this is test title this is test title this is test title this is test title this is test title this is test title this is test title this is test title this is test title this is test title this is test title this is test title',
    writer: 'user1',
    register: new Date(),
    isNotice: true,
  },
  {
    title: 'this is test title',
    writer: 'user1',
    register: new Date(),
    isNotice: true,
  },
  {
    title: 'this is test title',
    writer: 'user1',
    register: new Date(),
    isNotice: true,
  },
  {
    title: 'this is test title',
    writer: 'user1',
    register: new Date(),
    isNotice: false,
  },
  {
    title: 'this is test title',
    writer: 'user1',
    register: new Date(),
    isNotice: false,
  },
  {
    title: 'this is test title',
    writer: 'user1',
    register: new Date(),
    isNotice: false,
  },
  {
    title: 'this is test title',
    writer: 'user1',
    register: new Date(),
    isNotice: false,
  },
  {
    title: 'this is test title',
    writer: 'user1',
    register: new Date(),
    isNotice: false,
  },
  {
    title: 'this is test title',
    writer: 'user1',
    register: new Date(),
    isNotice: false,
  },
  {
    title: 'this is test title',
    writer: 'user1',
    register: new Date(),
    isNotice: false,
  },
  {
    title: 'this is test title',
    writer: 'user1',
    register: new Date(),
    isNotice: false,
  },
  {
    title: 'this is test title',
    writer: 'user1',
    register: new Date(),
    isNotice: false,
  },
  {
    title: 'this is test title',
    writer: 'user1',
    register: new Date(),
    isNotice: false,
  },
  {
    title: 'this is test title',
    writer: 'user1',
    register: new Date(),
    isNotice: false,
  },
]
</script>

<template>
  <main class="w-vw p-24 flex justify-center">
    <section class="flex gap-4 w-full max-w-[800px]">
      <BoardNav class="md:flex hidden" />
      <ul class="flex flex-col gap-4 flex-1 overflow-hidden">
        <BoardLi
          v-for="e in data"
          :title="e.title"
          :writer="e.writer"
          :time="e.register"
          :isNotice="e.isNotice"
        />
      </ul>
    </section>
  </main>
</template>
