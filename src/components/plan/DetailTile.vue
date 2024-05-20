<script setup lang="ts">
import type { IAttraction } from '@/types/Attraction'
import { computed, ref } from 'vue'
import { useDnDStore } from '@/stores/dnd'
import { useResizeStore } from '@/stores/resize'
import { getOffset } from '@/utils/planDetail'
import type { IPlanDetail } from '@/types/Plan'
import dayjs from 'dayjs'

const props = defineProps<{
  data: IAttraction
  start: Date
  end: Date
  startDate: Date
  addDetail: (detail: IPlanDetail) => void
  deleteDetail: () => void
}>()

const dndStore = useDnDStore()
const resizeStore = useResizeStore()

const resizeREF = ref<HTMLDivElement | null>(null)

const offset = computed(() => {
  return getOffset(props.start, props.end, props.startDate, dndStore.width)
})

const mouseupHandler = () => {
  if (!resizeStore.offset) return

  props.addDetail({
    attraction: props.data,
    start: resizeStore.offset.start,
    end: dayjs(resizeStore.offset.start)
      .add(resizeStore.height * 30, 'minute')
      .toDate(),
  })
  resizeStore.clear()
  window.removeEventListener('mouseup', mouseupHandler)
}

const resizeHandler = () => {
  resizeStore.setOffset({
    offsetX: offset.value.offsetX,
    offsetY: offset.value.offsetY,
    start: props.start,
  })
  props.deleteDetail()
  window.addEventListener('mouseup', mouseupHandler)
}

const mousedownHandler = (e: MouseEvent) => {
  if (
    resizeREF.value &&
    (resizeREF.value as HTMLElement).contains(e.target as HTMLElement)
  ) {
    resizeHandler()
    return
  }
  props.deleteDetail()

  dndStore.startDrag({
    attraction: props.data,
    height: dayjs(props.end).diff(props.start, 'minute') / 30,
  })
  window.addEventListener('mouseup', () => {
    dndStore.endDrag()
  })
}
</script>

<template>
  <button
    v-if="offset.offsetX >= 0"
    class="absolute cursor-all-scroll select-none border rounded p-2 bg-zinc-100 border-zinc-200 hover:bg-zinc-200 hover:border-zinc-300 text-zinc-800"
    :style="`height: ${1.5 * offset.height}rem; width: ${
      dndStore.width
    }px; left: ${offset.offsetX}px; top: ${offset.offsetY}px`"
    @mousedown="mousedownHandler"
  >
    <div
      class="absolute left-0 bottom-0 w-full h-2 cursor-ns-resize"
      ref="resizeREF"
    ></div>
    <!-- <p class="mb-1 text-left">{{ props.data.title }}</p> -->
  </button>
</template>
