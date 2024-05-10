<script setup lang="ts">
import BoardLi from '@/components/ui/BoardLi.vue'

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
  <main class="w-vw p-24">
    <ul class="flex flex-col gap-2">
      <BoardLi
        v-for="e in data"
        :title="e.title"
        :writer="e.writer"
        :time="e.register"
        :isNotice="e.isNotice"
      />
    </ul>
  </main>
</template>
