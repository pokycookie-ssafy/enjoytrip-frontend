<script setup lang="ts">
import MyPlanLi from '@/components/users/MyPlanLi.vue'
import type { IPlan } from '@/types/Plan'
import axios from 'axios'
import { onMounted, ref } from 'vue'

const plans = ref<IPlan[]>([])

const fetchPlans = async () => {
  try {
    const { data } = await axios.get('')
    console.log(data)
  } catch (err) {
    console.error(err)
  }
}

onMounted(() => {
  fetchPlans()
})
</script>

<template>
  <section class="flex-1 flex justify-center overflow-y-auto">
    <div class="flex flex-col gap-8 w-full max-w-[800px] h-fit pt-24 p-14">
      <ul class="flex flex-col gap-4">
        <!-- <MyPlanLi :plan="plan" v-for="plan in plans" /> -->
        <MyPlanLi v-for="i in 10" />
      </ul>
    </div>
  </section>
</template>
