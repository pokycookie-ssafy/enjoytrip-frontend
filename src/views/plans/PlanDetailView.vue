<script setup lang="ts">
import AttractionDnDCard from '@/components/plan/AttractionDnDCard .vue'
import PlanResult from '@/components/plan/PlanResult.vue'
import TimeMapper from '@/components/plan/TimeMapper.vue'
import Calendar from '@/components/ui/Calendar.vue'
import Input, { type IInputInfo } from '@/components/ui/Input.vue'
import { usePlanStore } from '@/stores/plan'
import type { IAttraction } from '@/types/Attraction'
import type { IPlanDetail } from '@/types/Plan'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import dayjs from 'dayjs'
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import isBetween from 'dayjs/plugin/isBetween'
import Button from '@/components/ui/Button.vue'
import { validateBlank } from '@/utils/validator'
import { api } from '@/axios.config'

dayjs.extend(isBetween)

const route = useRoute()
const router = useRouter()
const planStore = usePlanStore()

const planId = ref(-1)
const title = ref('')
const startDate = ref(new Date())
const endDate = ref(new Date())
const attractions = ref<IAttraction[]>([])
const details = ref<IPlanDetail[]>([])

const titleInfo = ref<IInputInfo | null>(null)

const viewStartDate = ref(new Date())
const viewEndDate = ref(new Date())

const viewDetails = computed(() => {
  return [...details.value].filter((e) => {
    return dayjs(e.start).isBetween(
      viewStartDate.value,
      viewEndDate.value,
      'day',
      '[]'
    )
  })
})

const titleHandler = (value: string) => {
  titleInfo.value = null
  title.value = value
  if (!validateBlank(value)) {
    titleInfo.value = {
      message: '계획 이름을 정해주세요',
      status: 'danger',
    }
    return
  }
}

const fetchHandler = async () => {
  try {
    const { data } = await api.get(`/plans/details?id=${planId.value}`)
    console.log(data)
    console.log(data.data.planDetails)
    planStore.setDetails(
      data.data.planDetails.map((e: any) => ({
        attraction: e.attraction,
        start: new Date(e.start_date_time),
        end: new Date(e.end_date_time),
      })),
      planId.value
    )

    const plan = planStore.getPlan(planId.value)
    if (!plan) {
      router.push({ name: 'home' })
      return
    }
    attractions.value = [...plan.attractions]
    details.value = [...plan.details]
  } catch (err) {
    console.error(err)
  }
}

const saveHandler = async () => {
  planStore.saveDetails(details.value, planId.value)
  if (validateBlank(title.value)) planStore.setTitle(title.value, planId.value)
  try {
    const planDetails = details.value
      .filter((e) => {
        return dayjs(e.start).isBetween(
          viewStartDate.value,
          viewEndDate.value,
          'day',
          '[]'
        )
      })
      .map((e) => {
        return {
          content_id: e.attraction.contentId,
          start_date_time: dayjs(e.start).format('YYYY-MM-DDTHH:mm'),
          end_date_time: dayjs(e.end).format('YYYY-MM-DDTHH:mm'),
        }
      })
    const { data } = await api.post(`/plans/details`, {
      planId: planId.value,
      planDetails,
      planRequest: {
        title: title.value,
        start_date: dayjs(startDate.value).format('YYYY-MM-DD'),
        end_date: dayjs(endDate.value).format('YYYY-MM-DD'),
      },
    })
    console.log(data)
  } catch (err) {
    console.error(err)
  }
}

const prevViewDate = () => {
  const prevStartDate = dayjs(viewStartDate.value).subtract(1, 'day')
  const prevEndDate = dayjs(viewEndDate.value).subtract(1, 'day')

  if (prevStartDate.isBefore(startDate.value)) return
  viewStartDate.value = prevStartDate.toDate()
  viewEndDate.value = prevEndDate.toDate()
}

const nextViewDate = () => {
  const nextStartDate = dayjs(viewStartDate.value).add(1, 'day')
  const nextEndDate = dayjs(viewEndDate.value).add(1, 'day')

  if (nextEndDate.isAfter(endDate.value)) return
  viewStartDate.value = nextStartDate.toDate()
  viewEndDate.value = nextEndDate.toDate()
}

const addDetailHandler = (detail: IPlanDetail) => {
  const tmpDetails = [...details.value, detail]
  details.value = tmpDetails
}

const deleteDetailHandler = (index: number) => {
  const tmpDetails = [...details.value]
  tmpDetails.splice(index, 1)
  details.value = tmpDetails
}

const dateFormat = computed(() => {
  const start = dayjs(startDate.value).format('YYYY.MM.DD')
  const end = dayjs(endDate.value).format('YYYY.MM.DD')
  return `${start} - ${end}`
})

const dateHandler = (start: Date, end: Date) => {
  startDate.value = dayjs(start).startOf('date').toDate()
  endDate.value = dayjs(end).endOf('date').toDate()
}

watch([startDate, endDate], ([s, e]) => {
  viewStartDate.value = s
  viewEndDate.value =
    dayjs(e).diff(s, 'day') < 3 ? e : dayjs(s).add(2, 'day').toDate()
  planStore.changeDate(s, e, planId.value)
})

watch(
  () => route.params.id,
  () => {
    if (Array.isArray(route.params.id)) return
    planId.value = parseInt(route.params.id)
    const plan = planStore.getPlan(planId.value)
    if (!plan) {
      router.push({ name: 'home' })
      // router.push(errorpage) 404 not found
      return
    }
    title.value = plan.title
    startDate.value = plan.startDate
    endDate.value = plan.endDate
    attractions.value = [...plan.attractions]
    details.value = [...plan.details]
    fetchHandler()
  },
  { immediate: true }
)
</script>

<template>
  <main
    class="w-vw p-24 flex flex-col lg:flex-row justify-center items-center lg:items-start gap-4"
  >
    <section class="flex flex-col gap-2 mb-8 lg:w-[400px] w-full shrink-0">
      <Input
        label="계획이름"
        :value="title"
        @onChange="titleHandler"
        :info="titleInfo ?? undefined"
      />
      <Calendar
        class="border rounded h-72 bg-white"
        :start="startDate"
        :end="endDate"
        @onChange="dateHandler"
        range
      />
      <div
        class="flex justify-start items-center gap-2 bg-zinc-100 border p-2 pl-3 pr-3 rounded text-zinc-600 text-sm"
      >
        <FontAwesomeIcon icon="fa-regular fa-calendar-check" />
        <p>{{ dateFormat }}</p>
      </div>
      <ul
        class="flex flex-col flex-1 gap-2 w-full max-h-96 overflow-y-auto p-2 border rounded"
      >
        <AttractionDnDCard v-for="e in attractions" :data="e" />
      </ul>
      <div class="w-full border p-3 rounded">
        <PlanResult :plans="details" />
      </div>
      <Button @onClick="saveHandler">저장하기</Button>
    </section>
    <section class="flex-1 w-full">
      <TimeMapper
        :start="viewStartDate"
        :end="viewEndDate"
        :data="viewDetails"
        :addDetail="addDetailHandler"
        :deleteDetail="deleteDetailHandler"
        @onPrev="prevViewDate"
        @onNext="nextViewDate"
      />
    </section>
  </main>
</template>
