<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import isBetween from 'dayjs/plugin/isBetween'
import dayjs from 'dayjs'
import { ref, watch } from 'vue'
import { dailyArr, type ICalendar } from '@/utils/calendar'

dayjs.extend(isBetween)

const dayArr = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

const props = defineProps<{
  start: Date
  end: Date
  range?: boolean
  border?: boolean
}>()

const emits = defineEmits<{
  (e: 'onChange', start: Date, end: Date): void
}>()

const year = ref(props.start.getFullYear())
const month = ref(props.end.getMonth())
const calendar = ref<ICalendar[]>([])

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
    emits('onChange', cell.date, cell.date)
    return
  }

  if (dragStart.value) {
    if (dayjs(cell.date).isBefore(dragStart.value, 'day')) {
      emits('onChange', cell.date, dragStart.value)
    } else {
      emits('onChange', dragStart.value, cell.date)
    }
    dragStart.value = null
    dragEnd.value = null
  }
}

watch(
  [year, month],
  ([year, month]) => {
    calendar.value = dailyArr(year, month)
  },
  { immediate: true }
)
</script>

<template>
  <section class="min-w-64 select-none overflow-hidden flex flex-col">
    <div class="w-full h-8 flex justify-evenly items-center border-b">
      <button
        class="text-zinc-500 hover:bg-zinc-100 text-xs w-11 h-full transition-all hover:text-indigo-600 outline-none"
        @click="monthHandler(-1)"
      >
        <FontAwesomeIcon icon="fa-solid fa-angle-left" />
      </button>
      <button
        class="text-zinc-700 hover:bg-zinc-100 text-sm flex-1 h-full transition-all hover:text-indigo-600 outline-none"
        @click="setToday()"
      >
        {{ year }}.{{ (month + 1).toString().padStart(2, '0') }}
      </button>
      <button
        class="text-zinc-500 hover:bg-zinc-100 text-xs w-11 h-full transition-all hover:text-indigo-600 outline-none"
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
    <div
      class="w-full flex-1 grid grid-cols-7 grid-rows-6 data-[border=true]:border rounded"
      :data-border="props.border"
    >
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
