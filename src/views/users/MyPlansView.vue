<script setup lang="ts">
import { api } from '@/axios.config'
import MyPlanLi from '@/components/users/MyPlanLi.vue'
import { usePlanStore } from '@/stores/plan'
import type { IPlan } from '@/types/Plan'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import dayjs from 'dayjs'
import { onMounted, ref } from 'vue'

const plans = ref<IPlan[]>([])
const planStore = usePlanStore()

const fetchPlans = async () => {
  try {
    const { data } = await api.get('/plans')
    const tmpPlan: IPlan[] = []

    data.data.forEach((e: any) => {
      tmpPlan.push({
        id: e.id,
        title: e.title,
        startDate: dayjs(e.startDate).startOf('day').toDate(),
        endDate: dayjs(e.endDate).endOf('day').toDate(),
        attractions: [],
        details: [],
      })
    })
    plans.value = tmpPlan

    console.log(data)
    console.log(tmpPlan)
  } catch (err) {
    console.error(err)
  }
}

const refresh = () => {
  plans.value = planStore.plansR
}

onMounted(() => {
  fetchPlans()
})
</script>

<template>
  <section class="flex-1 flex justify-center overflow-y-auto">
    <div class="flex flex-col gap-8 w-full max-w-[800px] h-fit pt-24 p-14">
      <div
        class="w-full h-36 flex flex-col gap-3 justify-center items-center border rounded text-zinc-500 border-zinc-300"
        v-if="plans.length === 0"
      >
        <FontAwesomeIcon class="text-3xl" icon="fa-regular fa-face-sad-tear" />
        <p class="ellipsis">여행계획이 없어요</p>
      </div>
      <ul class="flex flex-col gap-4">
        <MyPlanLi :plan="plan" v-for="plan in plans" @onDelete="refresh" />
      </ul>
    </div>
  </section>
</template>
