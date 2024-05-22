<script setup lang="ts">
import { api } from '@/axios.config'
import PlanResult from '@/components/plan/PlanResult.vue'
import ReviewForm from '@/components/reviews/ReviewForm.vue'
import { usePlanStore } from '@/stores/plan'
import { useToastStore } from '@/stores/toast'
import type { IAttraction } from '@/types/Attraction'
import type { IPlan, IPlanDetail } from '@/types/Plan'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import dayjs from 'dayjs'
import { computed, onMounted, ref } from 'vue'

const props = defineProps<{
  plan: IPlan
}>()

const emits = defineEmits<{
  (e: 'onDelete'): void
}>()

const planStore = usePlanStore()
const { addToast } = useToastStore()

const isOpen = ref(false)
const review = ref<IAttraction | null>(null)
const details = ref<IPlanDetail[]>([])

const time = computed(() => {
  return (
    dayjs(props.plan.startDate).format('YYYY.MM.DD') +
    ' ~ ' +
    dayjs(props.plan.endDate).format('YYYY.MM.DD')
  )
})

const reviewSubmitHandler = () => {
  addToast('리뷰 작성 완료')
  review.value = null
}

const fetchHandler = async () => {
  try {
    const { data } = await api.get(`/plans/details?id=${props.plan.id}`)
    console.log(data)
    console.log(data.data.planDetails)

    const tmpDetails: IPlanDetail[] = data.data.planDetails.map((e: any) => ({
      attraction: e.attraction,
      start: new Date(e.start_date_time),
      end: new Date(e.end_date_time),
    }))
    details.value = tmpDetails
  } catch (err) {
    console.error(err)
  }
}

const deleteHandler = async () => {
  try {
    const { data } = await api.delete(`/plans?id=${props.plan.id}`)
    console.log(data)
    planStore.deletePlan(props.plan.id)
    emits('onDelete')
  } catch (err) {
    console.error(err)
  }
}

const openHandler = () => {
  isOpen.value = !isOpen.value
  if (!isOpen.value) review.value = null
}

onMounted(() => {
  fetchHandler()
})
</script>

<template>
  <li class="w-full border p-4 rounded text-zinc-700 shadow">
    <div class="flex justify-between">
      <span>
        <h3 class="text-lg font-semibold mb-1">{{ props.plan.title }}</h3>
        <p class="text-sm text-zinc-500">{{ time }}</p>
      </span>
      <button class="h-fit" @click="openHandler">
        <FontAwesomeIcon
          class="data-[open=true]:rotate-180 transition-transform"
          icon="fa-solid fa-angle-down"
          :data-open="isOpen"
        />
      </button>
    </div>
    <div class="flex justify-end text-sm mt-2 gap-2">
      <!-- <button class="flex items-center gap-1 hover:underline"> -->
      <!-- <p>리뷰 쓰기</p> -->
      <!-- <p>리뷰 보기</p> -->
      <!-- </button> -->
      <button
        class="flex items-center gap-1 hover:underline"
        @click="deleteHandler"
      >
        <p>삭제</p>
      </button>
    </div>
    <div class="p-2 border-t mt-2" v-show="isOpen">
      <PlanResult
        :plans="details"
        @onReview="(attraction) => (review = attraction)"
        allowReview
      />
    </div>
    <div class="p-2 border-t mt-2" v-if="review">
      <ReviewForm :attraction="review" @onSubmit="reviewSubmitHandler" />
    </div>
  </li>
</template>
