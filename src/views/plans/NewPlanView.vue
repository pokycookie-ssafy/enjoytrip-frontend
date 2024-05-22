<script setup lang="ts">
import { api } from '@/axios.config'
import Button from '@/components/ui/Button.vue'
import Calendar from '@/components/ui/Calendar.vue'
import InfoBox from '@/components/ui/InfoBox.vue'
import type { IInputInfo } from '@/components/ui/Input.vue'
import Input from '@/components/ui/Input.vue'
import { usePlanStore } from '@/stores/plan'
import type { IPlanRequest } from '@/types/Plan'
import { validateBlank } from '@/utils/validator'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import dayjs from 'dayjs'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const planStore = usePlanStore()
const router = useRouter()

const title = ref('')
const startDate = ref(new Date())
const endDate = ref(new Date())

const titleInfo = ref<IInputInfo | null>(null)

const dateFormat = computed(() => {
  const start = dayjs(startDate.value).format('YYYY.MM.DD')
  const end = dayjs(endDate.value).format('YYYY.MM.DD')
  return `${start} - ${end}`
})

const submitHandler = async () => {
  titleInfo.value = null

  if (!validateBlank(title.value)) {
    titleInfo.value = {
      message: '계획 이름을 정해주세요',
      status: 'danger',
    }
    return
  }

  try {
    const planRequest: IPlanRequest = {
      title: title.value,
      startDate: startDate.value,
      endDate: endDate.value,
    }

    const { data } = await api.post('/plans', {
      title: title.value,
      start_date: dayjs(startDate.value).format('YYYY-MM-DD'),
      end_date: dayjs(endDate.value).format('YYYY-MM-DD'),
    })
    const id = data.data
    console.log(data)
    planStore.createPlan({ ...planRequest, id, attractions: [], details: [] })
    router.push({ name: 'home' })
  } catch (err) {
    console.error(err)
  }
}

const titleHandler = (value: string) => {
  title.value = value
}

const dateHandler = (start: Date, end: Date) => {
  startDate.value = dayjs(start).startOf('date').toDate()
  endDate.value = dayjs(end).endOf('date').toDate()
}
</script>

<template>
  <main class="w-vw p-24 flex justify-center">
    <article class="flex flex-col gap-4 w-full max-w-[500px]">
      <span class="flex items-center gap-2 mb-8 text-indigo-600">
        <h2 class="text-2xl font-semibold">새 여행계획 만들기</h2>
        <FontAwesomeIcon class="text-lg" icon="fa-solid fa-angle-right" />
      </span>

      <section class="flex flex-col gap-2 mb-8">
        <h3 class="font-semibold text-zinc-600 pl-1 mb-2">
          1. 계획 이름 정하기
        </h3>
        <Input
          label="계획 이름"
          :info="titleInfo ?? undefined"
          :value="title"
          @onChange="titleHandler"
        />
        <InfoBox
          title="Tip"
          content="계획 이름은 이후 언제든 변경할 수 있습니다."
        />
      </section>

      <section class="flex flex-col gap-2">
        <h3 class="font-semibold text-zinc-600 pl-1 mb-2">
          2. 계획 날짜 정하기
        </h3>
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
        <InfoBox
          title="Tip"
          content="날짜를 드래그하면 여러 날짜를 선택할 수 있습니다."
        />
      </section>
      <Button @onClick="submitHandler">계획 만들기</Button>
    </article>
  </main>
</template>
