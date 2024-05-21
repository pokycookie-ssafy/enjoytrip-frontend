<script setup lang="ts">
import type { IPlanDetail } from '@/types/Plan'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import dayjs from 'dayjs'
import { computed } from 'vue'

interface IMappedDetails {
  start: Date
  end: Date
  title: string
  type: number
  addr: string
}

const props = defineProps<{
  plans: IPlanDetail[]
}>()

const details = computed(() => {
  if (props.plans.length === 0) return []

  const tmpPlans = [...props.plans].sort((a, b) => dayjs(a.start).diff(b.start))
  const result: IMappedDetails[][] = []

  let prev = dayjs(tmpPlans[0].start)
  let tmp: IMappedDetails[] = []

  tmpPlans.forEach((e) => {
    if (!prev.isSame(e.start, 'day')) {
      result.push(tmp)
      tmp = []
      prev = dayjs(e.start)
    }
    tmp.push({
      start: e.start,
      end: e.end,
      title: e.attraction.title,
      type: e.attraction.contentType,
      addr: e.attraction.addr1,
    })
  })
  if (tmp.length > 0) result.push(tmp)
  return result
})
</script>

<template>
  <div>
    <div
      class="flex items-center gap-2 text-zinc-600 font-semibold select-none"
      v-if="details.length === 0"
    >
      <FontAwesomeIcon icon="fa-regular fa-calendar-plus" />
      <p>일정을 추가해주세요</p>
    </div>
    <ul class="flex flex-col gap-2">
      <li v-for="day in details">
        <p class="font-semibold mb-2 text-zinc-600">
          {{ dayjs(day[0].start).format('M월 DD일') }}
        </p>
        <ul class="flex flex-col gap-4 text-zinc-600">
          <li
            class="flex gap-4 ml-2 pl-4 p-2 border-l-4 border-indigo-600"
            v-for="e in day"
          >
            <span class="flex flex-col gap-2 justify-between text-sm">
              <p>{{ dayjs(e.start).format('HH:mm') }}</p>
              <p>{{ dayjs(e.end).format('HH:mm') }}</p>
            </span>
            <p class="ellipsis">{{ e.title }}</p>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
