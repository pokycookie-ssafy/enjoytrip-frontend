<script setup lang="ts">
import ProfileImg from '@/components/ui/ProfileImg.vue'
import { useAuthStore } from '@/stores/authStore'
import { useRoute } from 'vue-router'

const authStore = useAuthStore()
const route = useRoute()

const menuArr = [
  {
    label: '내 프로필 보기',
    href: '/mypage/profile',
    name: 'profile',
  },
  {
    label: '내 여행 계획 보기',
    href: '/mypage/plans',
    name: 'myplans',
  },
]
</script>

<template>
  <main class="w-vw h-screen flex">
    <section class="shadow w-80 p-8">
      <div
        class="flex flex-col justify-start items-center p-5 border-b"
        v-if="authStore.user"
      >
        <ProfileImg class="w-20 h-20" editable />
        <h2 class="mt-2 text-xl font-semibold text-zinc-700">
          {{ authStore.user.nickname }}
        </h2>
        <p class="text-sm text-zinc-400 font-light">
          {{ authStore.user.email }}
        </p>
      </div>
      <ul class="flex flex-col gap-2 pt-2 pb-2">
        <RouterLink
          class="w-full h-10 text-zinc-600 text-left border-l-4 p-2 pl-3 pr-3 ellipsis text-sm select-none data-[route=true]:border-indigo-600 data-[route=true]:text-indigo-600 hover:border-indigo-600 hover:text-indigo-600 transition-colors"
          :data-route="route.path === e.href"
          :to="{ name: e.name }"
          v-for="e in menuArr"
        >
          {{ e.label }}
        </RouterLink>
      </ul>
    </section>
    <RouterView />
  </main>
</template>

<style scoped>
.shadow {
  box-shadow: 3px 0px 15px 3px rgba(0, 0, 0, 0.1);
}
</style>
