<script setup lang="ts">
import AttractionCard from '@/components/frame/AttractionCard.vue'
import Button from '@/components/ui/Button.vue'
import Dropdown from '@/components/ui/Dropdown.vue'
import ProfileImg from '@/components/ui/ProfileImg.vue'
import { useAuthStore } from '@/stores/authStore'
import { usePlanStore } from '@/stores/plan'
import { useToastStore } from '@/stores/toast'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const planStore = usePlanStore()
const toast = useToastStore()
const router = useRouter()

const detailPlanHandler = () => {
  const planId = planStore.plan?.id
  if (!planId) {
    toast.addToast('계획을 먼저 선택해주세요', 'danger')
    return
  }
  router.push(`/plans/${planId}`)
}
</script>

<template>
  <article
    class="w-full h-full p-4 flex flex-col gap-4 overflow-x-hidden overflow-y-auto"
  >
    <section
      class="p-2 pb-4 border-zinc-300 flex justify-start items-center gap-4 border-b select-none"
    >
      <ProfileImg class="w-14 h-14" />
      <div v-if="authStore.user" class="flex-1">
        <h3 class="text-xl font-semibold text-zinc-700 ellipsis">
          {{ authStore.user.nickname }}
        </h3>
        <p class="text-sm text-zinc-400 font-light ellipsis">
          {{ authStore.user.email }}
        </p>
      </div>
      <h3 v-if="!authStore.user" class="text-zinc-700 ellipsis">
        로그인 해주세요
      </h3>
    </section>

    <section
      class="pb-4 border-zinc-300 flex flex-col justify-start items-center gap-2 border-b"
    >
      <Dropdown
        class="w-full"
        :placeholder="planStore.plan?.title ?? '계획을 선택해주세요'"
        autoClose
      >
        <button class="dropdown-li" v-if="planStore.plans.length === 0">
          새 계획을 만들어주세요
        </button>
        <button
          class="dropdown-li"
          v-for="e in planStore.plans"
          :key="e.id"
          @click="planStore.setPlan(e.id)"
        >
          {{ e.title }}
        </button>
      </Dropdown>
      <RouterLink class="w-full" :to="{ name: 'newPlan' }">
        <Button class="ellipsis w-full">새 계획 만들기</Button>
      </RouterLink>
    </section>

    <ul class="flex flex-col flex-1 gap-2 w-full overflow-y-auto">
      <AttractionCard
        :data="e"
        :index="i"
        v-for="(e, i) in planStore.plan?.attractions"
      />
    </ul>
    <!-- <section
      class="flex flex-col flex-1 justify-start items-center gap-4"
    ></section> -->
    <Button class="ellipsis" @onClick="detailPlanHandler"
      >세부 계획 세우기</Button
    >
  </article>
</template>
