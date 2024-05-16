<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const routeName = ref('')

const routeArr = [
  {
    label: '아이디 찾기',
    path: '/find/id',
    name: 'findEmail',
  },
  {
    label: '비밀번호 찾기',
    path: '/find/password',
    name: 'findPassword',
  },
]

watch(
  route,
  (to) => {
    routeName.value = to.name?.toString() ?? ''
  },
  { immediate: true }
)
</script>

<template>
  <main class="w-vw h-screen flex flex-col gap-8 justify-center items-center">
    <div
      class="flex gap-4 w-full max-w-[450px] p-3 border rounded-md select-none"
    >
      <RouterLink
        class="flex-1 cursor-pointer"
        v-for="data in routeArr"
        :to="{ name: data.name }"
      >
        <div
          class="w-full h-1 bg-zinc-200 mb-2 rounded-full data-[route=true]:bg-indigo-600"
          :data-route="routeName === data.name"
        ></div>
        <p
          class="text-sm font-semibold text-zinc-500 data-[route=true]:text-indigo-600"
          :data-route="routeName === data.name"
        >
          {{ data.label }}
        </p>
      </RouterLink>
    </div>
    <section
      class="p-8 pt-12 pb-12 gap-8 shadow-lg flex flex-col rounded-md border w-full max-w-[450px]"
    >
      <RouterView />
    </section>
  </main>
</template>
