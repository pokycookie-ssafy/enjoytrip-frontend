<script setup lang="ts">
import AttractionDnDCard from '@/components/plan/AttractionDnDCard .vue'
import TimeMapper from '@/components/plan/TimeMapper.vue'
import Calendar from '@/components/ui/Calendar.vue'
import Input from '@/components/ui/Input.vue'
import { usePlanStore } from '@/stores/plan'
import type { IAttraction } from '@/types/Attraction'
import type { IPlanDetail } from '@/types/Plan'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import dayjs from 'dayjs'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const planStore = usePlanStore()

const title = ref('')
const startDate = ref(new Date())
const endDate = ref(new Date())
const attractions = ref<IAttraction[]>([])
const details = ref<IPlanDetail[]>([])

// const startDefault = ref(new Date())
// const endDefault = ref(new Date())

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

onMounted(() => {
  if (Array.isArray(route.params.id)) return
  const planId = parseInt(route.params.id)
  const plan = planStore.getPlan(planId)
  if (!plan) {
    // router.push(errorpage) 404 not found
    return
  }
  title.value = plan.title
  startDate.value = plan.startDate
  endDate.value = plan.endDate
  attractions.value = [...plan.attractions]
  details.value = [...plan.details]
})
</script>

<template>
  <main
    class="w-vw p-24 flex flex-col lg:flex-row justify-center items-center lg:items-start gap-4"
  >
    <section class="flex flex-col gap-2 mb-8 lg:w-[400px] w-full shrink-0">
      <Input label="계획이름" :default="title" />
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
      <ul class="flex flex-col flex-1 gap-2 w-full overflow-y-auto">
        <AttractionDnDCard v-for="e in planStore.plan?.attractions" :data="e" />
      </ul>
    </section>
    <section class="flex-1 w-full">
      <TimeMapper
        :start="startDate"
        :end="endDate"
        :data="details"
        :addDetail="addDetailHandler"
        :deleteDetail="deleteDetailHandler"
      />
    </section>
  </main>
</template>
