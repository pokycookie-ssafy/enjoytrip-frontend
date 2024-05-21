import { useToastStore } from '@/stores/toast'
import type { IAttraction } from '@/types/Attraction'
import type { IPlan, IPlanDetail } from '@/types/Plan'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const usePlanStore = defineStore('plan', () => {
  const toast = useToastStore()

  const plans = ref<IPlan[]>([])
  const currId = ref(-1)

  const planList = computed(() => {
    return plans.value.map((e) => ({ id: e.id, title: e.title }))
  })

  const currentPlan = computed(() => {
    return plans.value.find((e) => e.id === currId.value)
  })

  const createPlan = (plan: IPlan) => {
    const tmpPlans = [...plans.value]
    tmpPlans.push(plan)
    plans.value = tmpPlans
    currId.value = plan.id
  }

  const setPlan = (id: number) => {
    currId.value = id
  }

  const getPlan = (id: number) => {
    return plans.value.find((e) => e.id === currId.value)
  }

  const setTitle = (title: string) => {
    const tmpPlans = [...plans.value]
    const tmpPlan = tmpPlans.find((e) => e.id === currId.value)

    if (!tmpPlan) {
      toast.addToast('계획을 먼저 선택해주세요', 'danger')
      return
    }

    tmpPlan.title = title
    plans.value = tmpPlans
  }

  const saveDetails = (details: IPlanDetail[]) => {
    const tmpPlans = [...plans.value]
    const tmpPlan = tmpPlans.find((e) => e.id === currId.value)

    if (!tmpPlan) {
      toast.addToast('계획을 먼저 선택해주세요', 'danger')
      return
    }

    tmpPlan.details = details
    plans.value = tmpPlans
    toast.addToast('저장되었습니다')
  }

  const changeDate = (start: Date, end: Date) => {
    const tmpPlans = [...plans.value]
    const tmpPlan = tmpPlans.find((e) => e.id === currId.value)

    if (!tmpPlan) {
      toast.addToast('계획을 먼저 선택해주세요', 'danger')
      return
    }

    tmpPlan.startDate = start
    tmpPlan.endDate = end
    plans.value = tmpPlans
  }

  const addAttraction = (attraction: IAttraction) => {
    const tmpPlans = [...plans.value]
    const tmpPlan = tmpPlans.find((e) => e.id === currId.value)

    if (!tmpPlan) {
      toast.addToast('계획을 먼저 선택해주세요', 'danger')
      return
    }

    const exits = tmpPlan.attractions.some(
      (e) => e.contentId === attraction.contentId
    )
    if (exits) {
      toast.addToast('이미 선택한 관광지입니다', 'danger')
      return
    }
    tmpPlan.attractions.push(attraction)
    plans.value = tmpPlans
    toast.addToast('관광지가 추가되었습니다')
  }

  const removeAttraction = (index: number) => {
    const tmpPlans = [...plans.value]
    const tmpPlan = tmpPlans.find((e) => e.id === currId.value)

    if (!tmpPlan) {
      toast.addToast('계획을 먼저 선택해주세요', 'danger')
      return
    }

    tmpPlan.attractions.splice(index, 1)
    plans.value = tmpPlans
    toast.addToast('관광지가 삭제되었습니다')
  }

  return {
    plan: currentPlan,
    plans: planList,
    createPlan,
    setPlan,
    getPlan,
    addAttraction,
    removeAttraction,
    saveDetails,
    changeDate,
    setTitle,
  }
})
