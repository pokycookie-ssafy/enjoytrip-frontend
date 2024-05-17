<script setup lang="ts">
import Button from '@/components/ui/Button.vue'
import Calendar from '@/components/ui/Calendar.vue'
import InfoBox from '@/components/ui/InfoBox.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import dayjs from 'dayjs'
import { computed, ref } from 'vue'

const title = ref('')
const startDate = ref(new Date())
const endDate = ref(new Date())

const dateFormat = computed(() => {
  const start = dayjs(startDate.value).format('YYYY.MM.DD')
  const end = dayjs(endDate.value).format('YYYY.MM.DD')
  return `${start} - ${end}`
})

const titleHandler = (e: Event) => {
  title.value = (e.target as HTMLInputElement)?.value ?? ''
}

const dateHandler = (start: Date, end: Date) => {
  startDate.value = dayjs(start).startOf('date').toDate()
  endDate.value = dayjs(end).endOf('date').toDate()
}
</script>

<template>
  <main class="w-vw p-24 flex justify-center">
    <article class="flex flex-col gap-4 w-full max-w-[500px]">
      <span class="flex items-center gap-2 mb-8 text-indigo-600">
        <h2 class="text-2xl font-semibold">새 여행계획 만들기</h2>
        <FontAwesomeIcon class="text-lg" icon="fa-solid fa-angle-right" />
      </span>

      <section class="flex flex-col gap-2 mb-8">
        <h3 class="font-semibold text-zinc-600 pl-1 mb-2">
          1. 계획 이름 정하기
        </h3>
        <input
          class="border w-full h-10 rounded outline-none p-1 pl-3 pr-3"
          placeholder="계획 이름을 입력해주세요."
          :value="title"
          @change="titleHandler"
        />
        <InfoBox
          title="Tip"
          content="계획 이름은 이후 언제든 변경할 수 있습니다."
        />
      </section>

      <section class="flex flex-col gap-2">
        <h3 class="font-semibold text-zinc-600 pl-1 mb-2">
          2. 계획 날짜 정하기
        </h3>
        <Calendar
          class="border rounded h-72 bg-white"
          @onChange="dateHandler"
          range
        />
        <div
          class="flex justify-start items-center gap-2 bg-zinc-100 border p-2 pl-3 pr-3 rounded text-zinc-600 text-sm"
        >
          <FontAwesomeIcon icon="fa-regular fa-calendar-check" />
          <p>{{ dateFormat }}</p>
        </div>
      </section>
      <InfoBox
        title="Tip"
        content="계획 날짜는 이후 언제든 변경할 수 있습니다."
      />
      <Button>계획 만들기</Button>
    </article>
  </main>
</template>
