<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import isBetween from 'dayjs/plugin/isBetween'
import dayjs from 'dayjs'
import { ref, watch } from 'vue'
import { dailyArr, type ICalendar } from '@/utils/calendar'

dayjs.extend(isBetween)

const dayArr = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

const props = defineProps<{
  default?: { start: Date; end: Date }
  range?: boolean
}>()

const emits = defineEmits<{
  (e: 'onChange', start: Date, end: Date): void
}>()

const defaultStart = props.default?.start ?? new Date()
const defaultEnd = props.default?.end ?? new Date()

const year = ref(defaultStart.getFullYear())
const month = ref(defaultEnd.getMonth())
const calendar = ref<ICalendar[]>([])

const start = ref(defaultStart)
const end = ref(defaultEnd)
const dragStart = ref<Date | null>(null)
const dragEnd = ref<Date | null>(null)

const setToday = () => {
  const today = new Date()
  year.value = today.getFullYear()
  month.value = today.getMonth()
}

const monthHandler = (delta: number) => {
  let tmpMonth = month.value + (delta % 12)
  let tmpYear = year.value

  if (tmpMonth > 11) {
    tmpMonth = tmpMonth - 12
    tmpYear += 1
  } else if (tmpMonth < 0) {
    tmpMonth = 12 + tmpMonth
    tmpYear -= 1
  }

  year.value = tmpYear
  month.value = tmpMonth
}

const cellMouseDown = (cell: ICalendar) => {
  if (!props.range) return
  dragStart.value = cell.date
  dragEnd.value = cell.date
}

const cellMouseEnter = (cell: ICalendar) => {
  if (dragStart.value) dragEnd.value = cell.date
}

const cellMouseUp = (cell: ICalendar) => {
  if (!props.range) {
    start.value = cell.date
    end.value = cell.date
    emits('onChange', cell.date, cell.date)
    return
  }

  if (dragStart.value) {
    if (dayjs(cell.date).isBefore(start.value, 'day')) {
      start.value = cell.date
      end.value = dragStart.value
      emits('onChange', cell.date, start.value)
    } else {
      start.value = dragStart.value
      end.value = cell.date
      emits('onChange', dragStart.value, cell.date)
    }
    dragStart.value = null
    dragEnd.value = null
  }
}

watch(
  () => props.range,
  () => {
    if (!props.range) end.value = start.value
  },
  { immediate: true }
)

watch(
  [year, month],
  ([year, month]) => {
    calendar.value = dailyArr(year, month)
  },
  { immediate: true }
)

watch(
  [start, end],
  ([s, e]) => {
    if (dayjs(s).isAfter(e)) {
      start.value = e
      end.value = s
    }
  },
  { immediate: true }
)
</script>

<template>
  <section class="min-w-64 select-none overflow-hidden flex flex-col">
    <div class="w-full h-8 flex justify-evenly items-center">
      <button
        class="text-zinc-500 text-xs w-11 h-full transition-all cursor-default hover:text-indigo-600 outline-none"
        @click="monthHandler(-1)"
      >
        <FontAwesomeIcon icon="fa-solid fa-angle-left" />
      </button>
      <button
        class="text-zinc-700 text-sm w-full h-full transition-all cursor-default hover:text-indigo-600 outline-none"
        @click="setToday()"
      >
        {{ year }}.{{ (month + 1).toString().padStart(2, '0') }}
      </button>
      <button
        class="text-zinc-500 text-xs w-11 h-full transition-all cursor-default hover:text-indigo-600 outline-none"
        @click="monthHandler(1)"
      >
        <FontAwesomeIcon icon="fa-solid fa-angle-right" />
      </button>
    </div>
    <div class="w-full h-7 grid grid-cols-7 text-sm">
      <p
        class="w-full h-full flex justify-center items-center text-xs"
        v-for="(day, i) in dayArr"
        :key="i"
      >
        {{ day }}
      </p>
    </div>
    <div class="w-full flex-1 grid grid-cols-7 grid-rows-6 border rounded">
      <button
        v-for="(cell, i) in calendar"
        class="transition-all data-[isStart=true]:rounded-tl-md data-[isCurr=false]:text-zinc-300 data-[isEnd=true]:rounded-br-md data-[selected=true]:bg-indigo-500 data-[selected=true]:text-white data-[drag=true]:bg-zinc-200 data-[today=true]:underline data-[day='0']:data-[isCurr=true]:data-[selected=false]:text-blue-600 data-[day='1']:data-[isCurr=true]:data-[selected=false]:text-red-600 hover:bg-zinc-100 text-sm outline-none"
        :key="i"
        @mousedown="cellMouseDown(cell)"
        @mouseenter="cellMouseEnter(cell)"
        @mouseup="cellMouseUp(cell)"
        :data-isCurr="cell.status === 'curr'"
        :data-isStart="dayjs(cell.date).isSame(start) && dragStart === null"
        :data-isEnd="dayjs(cell.date).isSame(end) && dragEnd === null"
        :data-selected="
          !dragStart && dayjs(cell.date).isBetween(start, end, 'day', '[]')
        "
        :data-today="dayjs(cell.date).isSame(new Date(), 'day')"
        :data-day="(i + 1) % 7"
        :data-drag="
          dragStart &&
          dayjs(cell.date).isBetween(dragStart, dragEnd, 'day', '[]')
        "
      >
        <p>
          {{ cell.value }}
        </p>
      </button>
    </div>
  </section>
</template>
