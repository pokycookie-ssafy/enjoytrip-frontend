<script setup lang="ts">
import PlanResult from '@/components/plan/PlanResult.vue'
import planDetails from '@/mock/planDetails'
import type { IPlan } from '@/types/Plan'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ref } from 'vue'

// const props = defineProps<{
//   plan: IPlan
// }>()

const isOpen = ref(false)
</script>

<template>
  <li class="w-full border p-3 rounded text-zinc-700 shadow">
    <div class="flex justify-between">
      <span>
        <h3 class="text-lg font-semibold mb-1">여행계획 이름</h3>
        <p class="text-sm text-zinc-500">2024.05.20 ~ 2024.05.23</p>
      </span>
      <button class="h-fit" @click="isOpen = !isOpen">
        <FontAwesomeIcon
          class="data-[open=true]:rotate-180 transition-transform"
          icon="fa-solid fa-angle-down"
          :data-open="isOpen"
        />
      </button>
    </div>
    <div class="flex justify-end text-sm mt-2 gap-2">
      <button class="flex items-center gap-1 hover:underline">
        <p>리뷰 쓰기</p>
        <!-- <p>리뷰 보기</p> -->
      </button>
      <button class="flex items-center gap-1 hover:underline">
        <p>삭제</p>
      </button>
    </div>
    <div class="p-2 border-t mt-2" v-show="isOpen">
      <PlanResult :plans="planDetails" />
    </div>
  </li>
</template>
