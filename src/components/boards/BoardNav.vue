<script setup lang="ts">
import { ref } from 'vue'
import Button from '@/components/ui/Button.vue'
import Dropdown from '@/components/ui/Dropdown.vue'

const rangeOptions = [
  { label: '전체', value: 0 },
  { label: '1일', value: 1 },
  { label: '1주', value: 2 },
  { label: '1개월', value: 3 },
  { label: '6개월', value: 4 },
  { label: '1년', value: 5 },
]

const searchOptions = [
  { label: '제목', value: 0 },
  { label: '글작성자', value: 1 },
]

const rangeOption = ref(rangeOptions[0])
const searchOption = ref(searchOptions[0])
</script>

<template>
  <nav class="pt-2 pb-2 w-full border-b flex flex-col gap-8">
    <div class="flex flex-col md:flex-row justify-between items-center gap-2">
      <div class="w-full flex items-center gap-1">
        <Dropdown class="w-28" :placeholder="rangeOption.label" autoClose>
          <button
            class="dropdown-li"
            v-for="(e, i) in rangeOptions"
            :key="i"
            @click="rangeOption = e"
          >
            {{ e.label }}
          </button>
        </Dropdown>
        <Dropdown class="w-32" :placeholder="searchOption.label" autoClose>
          <button
            class="dropdown-li"
            v-for="(e, i) in searchOptions"
            :key="i"
            @click="searchOption = e"
          >
            {{ e.label }}
          </button>
        </Dropdown>
      </div>
      <div class="flex w-full gap-1 items-center justify-end">
        <input
          class="w-full md:w-52 border rounded outline-none pl-3 pr-3 p-2 text-sm focus:border-indigo-600"
        />
        <Button class="border border-indigo-500 shrink-0">검색</Button>
      </div>
    </div>
    <ul class="flex text-xs gap-2 font-semibold">
      <li class="flex-1"></li>
      <li class="w-20">작성자</li>
      <li class="w-12">작성일</li>
      <li class="w-12">조회수</li>
      <li class="w-12">좋아요</li>
    </ul>
  </nav>
</template>
