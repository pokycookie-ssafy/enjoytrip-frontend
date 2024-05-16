<script setup lang="ts">
import pagination from '@/utils/pagination'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ref, watch } from 'vue'

const props = defineProps<{
  idx: number
  totalCount: number
  countPerPage: number
}>()

const emits = defineEmits<{
  (e: 'onClick', v: number): void
  (e: 'onPrev', v: number): void
  (e: 'onNext', v: number): void
}>()

const prevHandler = () => {
  const prevStep = Math.floor((props.idx - 1) / 5) - 1
  if (prevStep < 0) return
  emits('onPrev', prevStep * 5 + 1)
}

const nextHandler = () => {
  const nextStep = Math.floor((props.idx - 1) / 5) + 1
  const maxIdx = Math.ceil(props.totalCount / props.countPerPage)
  if (nextStep * 5 + 1 > maxIdx) return
  emits('onNext', nextStep * 5 + 1)
}

const idxArr = ref<number[]>([])

watch(
  [() => props.idx, () => props.totalCount, () => props.countPerPage],
  () => {
    const { start, end } = pagination(
      props.idx,
      props.countPerPage,
      props.totalCount
    )
    const tmpArr = []
    for (let i = start; i <= end; i++) {
      tmpArr.push(i)
    }
    idxArr.value = tmpArr
  },
  { immediate: true }
)
</script>

<template>
  <div
    class="select-none flex rounded border overflow-hidden w-fit divide-x text-zinc-600"
  >
    <button
      class="outline-none w-9 h-9 hover:bg-zinc-100 text-zinc-500 hover:text-indigo-600"
      @click="prevHandler"
    >
      <FontAwesomeIcon icon="fa-solid fa-angle-left" />
    </button>
    <button
      class="outline-none w-9 h-9 hover:bg-zinc-100 data-[selected=true]:bg-indigo-600 data-[selected=true]:text-white"
      v-for="i in idxArr"
      :key="i"
      :data-selected="i === props.idx"
      @click="emits('onClick', i)"
    >
      {{ i }}
    </button>
    <button
      class="outline-none w-9 h-9 hover:bg-zinc-100 text-zinc-500 hover:text-indigo-600"
      @click="nextHandler"
    >
      <FontAwesomeIcon icon="fa-solid fa-angle-right" />
    </button>
  </div>
</template>
