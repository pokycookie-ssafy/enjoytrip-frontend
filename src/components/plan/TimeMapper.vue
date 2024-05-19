<script setup lang="ts">
import { useDnDStore } from '@/stores/dnd'
import type { IPlanDetail } from '@/types/Plan'
import { dayString } from '@/utils/day'
import dayjs from 'dayjs'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import DetailTile from './DetailTile.vue'

const props = defineProps<{
  start: Date
  end: Date
  data: IPlanDetail[]
}>()

const dndStore = useDnDStore()

const timeArr = ref<string[]>([])
const dateArr = ref<Date[]>([])
const areaREF = ref<HTMLElement | null>(null)

// const refArr = ref([])
// const refHandler = (e: Element, date: Date, time: number) => {
//   const r = dayjs(date).diff(props.start, 'day')
//   const c = time
//   console.log(`${r} ${c}`)
// }

const mouseupHandler = (date: Date, time: number) => {
  if (!dndStore.data) return

  const attraction = dndStore.data.attraction
  const start = dayjs(date)
    .startOf('day')
    .add(30 * time, 'minute')
    .toDate()
  const end = dayjs(start)
    .add(30 * dndStore.data.height, 'minute')
    .toDate()

  props.data.push({ attraction, start, end })
}

const resizeHandler = () => {
  const width = areaREF.value?.clientWidth ?? 0
  const count = dayjs(props.end).diff(props.start, 'day') + 1
  dndStore.setWidth((width - 80 - 16 - 16) / count)
}

const getOffset = (detail: IPlanDetail) => {
  const offsetX =
    16 + 80 + dayjs(detail.start).diff(props.start, 'day') * dndStore.width
  const offsetY =
    56 +
    16 +
    1 +
    (dayjs(detail.start).diff(dayjs(detail.start).startOf('day'), 'minute') /
      30) *
      24
  const height = dayjs(detail.end).diff(detail.start, 'minute') / 30

  return { offsetX, offsetY, height }
}

watch(
  () => [props.start, props.end],
  ([s, e]) => {
    const tmpDateArr: Date[] = []
    const start = dayjs(s)
    const end = dayjs(e)

    for (let i = start; !i.isAfter(end); i = i.add(1, 'day')) {
      tmpDateArr.push(i.toDate())
    }
    dateArr.value = tmpDateArr
    resizeHandler()
  },
  { immediate: true }
)

onMounted(() => {
  const tmpTimeArr: string[] = []
  for (let h = 1; h < 24; h++) {
    const period = h <= 12 ? '오전' : '오후'
    const h12 = h <= 12 ? h : h % 12
    tmpTimeArr.push(`${period} ${h12}시`)
  }
  timeArr.value = tmpTimeArr

  resizeHandler()
  window.addEventListener('resize', resizeHandler)
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeHandler)
})
</script>

<template>
  <article class="border p-4 flex w-full divide-x select-none">
    <section class="p-4 flex w-full relative" ref="areaREF">
      <div class="text-sm text-zinc-500 w-20 shrink-0">
        <p class="w-full h-14"></p>
        <div
          class="h-12 pr-2 flex justify-end items-end"
          v-for="i in timeArr"
          :key="i"
        >
          <p class="translate-y-[60%]">{{ i }}</p>
        </div>
      </div>
      <div class="flex-1" v-for="date in dateArr">
        <span class="w-full h-14 flex flex-col justify-center items-center">
          <p class="text-zinc-500 text-xs">{{ dayString(date.getDay()) }}</p>
          <p class="text-2xl text-zinc-700">{{ date.getDate() }}</p>
        </span>
        <div
          class="w-full h-6 hover:bg-zinc-100 data-[border=true]:border-b"
          v-for="time in 48"
          :key="time"
          :data-border="time % 2 == 0 && time !== 48"
          @mouseup="mouseupHandler(date, time - 1)"
        ></div>
      </div>
      <DetailTile
        :data="e.attraction"
        :offset="getOffset(e)"
        v-for="e in props.data"
      />
    </section>
  </article>
</template>
