<script setup lang="ts">
import { useDnDStore } from '@/stores/dnd'
import type { IPlanDetail } from '@/types/Plan'
import { dayString } from '@/utils/day'
import dayjs from 'dayjs'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import DetailTile from './DetailTile.vue'
import ResizeTile from './ResizeTile.vue'
import { useResizeStore } from '@/stores/resize'
import { getTimeIdx } from '@/utils/planDetail'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const props = defineProps<{
  start: Date
  end: Date
  data: IPlanDetail[]
  addDetail: (detail: IPlanDetail) => void
  deleteDetail: (index: number) => void
}>()

const emits = defineEmits<{
  (e: 'onPrev'): void
  (e: 'onNext'): void
}>()

const dndStore = useDnDStore()
const resizeStore = useResizeStore()

const timeArr = ref<string[]>([])
const dateArr = ref<Date[]>([])
const areaREF = ref<HTMLElement | null>(null)

const startDetailHandler = (date: Date, time: number) => {
  // if (!dndStore.data) return
  // const attraction = dndStore.data.attraction
  // const start = dayjs(date)
  //   .startOf('day')
  //   .add(30 * time, 'minute')
  //   .toDate()
  // const end = dayjs(start)
  //   .add(30 * dndStore.data.height, 'minute')
  //   .toDate()
}

const mouseenterHandler = (date: Date, time: number) => {
  if (resizeStore.offset) {
    const height = time
    const startHeight = getTimeIdx(resizeStore.offset.start)
    resizeStore.setHeight(Math.max(height - startHeight + 1, 1))
  }
}

const mouseupHandler = (date: Date, time: number) => {
  if (dndStore.data) {
    const attraction = dndStore.data.attraction
    const start = dayjs(date)
      .startOf('day')
      .add(30 * time, 'minute')
      .toDate()
    const end = dayjs(start)
      .add(30 * dndStore.data.height, 'minute')
      .toDate()

    props.addDetail({ attraction, start, end })
  }
}

const resizeHandler = () => {
  const width = areaREF.value?.clientWidth ?? 0
  const count = dayjs(props.end).diff(props.start, 'day') + 1
  dndStore.setWidth((width - 80) / count)
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
  <article class="border rounded p-4 flex w-full divide-x select-none">
    <section class="flex w-full relative" ref="areaREF">
      <div class="flex w-full justify-between pt-6 text-zinc-600 absolute">
        <button class="w-6 h-6 hover:text-indigo-600" @click="emits('onPrev')">
          <FontAwesomeIcon icon="fa-solid fa-angle-left" />
        </button>
        <button class="w-6 h-6 hover:text-indigo-600" @click="emits('onNext')">
          <FontAwesomeIcon icon="fa-solid fa-angle-right" />
        </button>
      </div>
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
          class="w-full h-6 data-[border=true]:border-b"
          v-for="time in 48"
          :key="time"
          :data-border="time % 2 == 0 && time !== 48"
          @mousedown="startDetailHandler(date, time - 1)"
          @mouseup="mouseupHandler(date, time - 1)"
          @mouseenter="mouseenterHandler(date, time - 1)"
        ></div>
      </div>
      <DetailTile
        :data="e.attraction"
        :startDate="props.start"
        :start="e.start"
        :end="e.end"
        :addDetail="props.addDetail"
        :deleteDetail="() => props.deleteDetail(i)"
        v-for="(e, i) in props.data"
      />
      <ResizeTile />
    </section>
  </article>
</template>
