<script setup lang="ts">
import Button from '@/components/ui/Button.vue'
import Dropdown from '@/components/ui/Dropdown.vue'
import ProfileImg from '@/components/ui/ProfileImg.vue'
</script>

<template>
  <article
    class="w-full h-full p-4 flex flex-col gap-4 overflow-x-hidden overflow-y-auto"
  >
    <section
      class="p-2 pb-4 border-zinc-300 flex justify-start items-center gap-4 border-b select-none"
    >
      <ProfileImg class="w-14 h-14" />
      <div>
        <h3 class="text-xl font-semibold text-zinc-700">Cookie</h3>
        <p class="text-sm text-zinc-400 font-light">cookie@ssafy.com</p>
      </div>
    </section>

    <section
      class="pb-4 border-zinc-300 flex flex-col justify-start items-center gap-2 border-b"
    >
      <Dropdown class="w-full" :placeholder="'계획을 선택해주세요'" autoClose>
        <button
          class="w-full text-left p-3 hover:bg-indigo-600 hover:text-white text-sm"
          v-for="i in 5"
        >
          내 여행 계획 {{ i }}
        </button>
      </Dropdown>
      <RouterLink class="w-full" :to="{ name: 'newPlan' }">
        <Button class="ellipsis w-full"> 새 계획 만들기 </Button>
      </RouterLink>
    </section>

    <section class="flex flex-col justify-start items-center gap-4"></section>
  </article>
</template>
