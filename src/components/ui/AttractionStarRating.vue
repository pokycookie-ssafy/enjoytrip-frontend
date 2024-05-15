<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import StarRating from './StarRating.vue'
import { ref, watch } from 'vue'

const props = defineProps<{
  data: number[]
}>()

const data = ref<number[]>([])
const ratio = ref<number[]>([])
const isOpen = ref(false)

watch(
  () => props.data,
  () => {
    const tmpRank = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    props.data.forEach((e) => {
      const rank = Math.ceil(e / 2)
      tmpRank[rank]++
    })
    data.value = tmpRank

    const tmpRatio = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    tmpRank.forEach((e, i) => {
      tmpRatio[i] = Math.round((e / props.data.length) * 100)
    })
    ratio.value = tmpRatio
  },
  { immediate: true }
)
</script>

<template>
  <section
    class="flex flex-col gap-3 bg-zinc-100 border rounded p-4 overflow-hidden"
  >
    <div class="flex justify-between items-start">
      <h2 class="text-zinc-600 font-semibold text-base">사용자 리뷰</h2>
      <button
        class="data-[open=true]:rotate-180 transition-all"
        :data-open="isOpen"
        @click="isOpen = !isOpen"
      >
        <FontAwesomeIcon
          class="hover:text-indigo-600"
          icon="fa-solid fa-chevron-down"
        />
      </button>
    </div>
    <span class="flex justify-start items-center gap-2">
      <StarRating class="w-24" :value="7" readonly />
      <p class="font-thin text-sm text-indigo-600">(리뷰 1624개)</p>
    </span>
    <div
      class="flex flex-col gap-2 data-[open=true]:mt-2 data-[open=true]:h-[132px] h-0 transition-all overflow-hidden"
      :data-open="isOpen"
    >
      <div
        class="flex justify-start items-center gap-2"
        v-for="i in 5"
        :key="i"
      >
        <p class="text-right text-indigo-600 font-semibold">{{ i }}</p>
        <FontAwesomeIcon icon="fa-solid fa-star" class="text-indigo-600" />
        <div
          class="relative flex justify-start overflow-hidden items-center rounded-full border flex-1 h-4 bg-zinc-200 border-zinc-300"
        >
          <div
            class="absolute bg-indigo-600 rounded-full h-full"
            :style="`width: ${ratio[i]}%`"
          ></div>
        </div>
        <p class="w-20 text-right text-zinc-700">
          {{ data[i] }} ({{ ratio[i] }}%)
        </p>
      </div>
    </div>
  </section>
</template>
