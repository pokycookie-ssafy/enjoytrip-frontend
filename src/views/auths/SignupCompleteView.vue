<script setup lang="ts">
import Button from '@/components/ui/Button.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
</script>

<template>
  <section class="flex flex-col gap-2 w-full">
    <div
      class="w-full h-64 flex flex-col justify-center items-center border rounded text-zinc-700"
    >
      <FontAwesomeIcon
        class="text-5xl mb-4 text-indigo-600"
        icon="fa-solid fa-gift"
      />
      <p>축하합니다!</p>
      <p>회원가입에 성공했습니다!</p>
    </div>
    <RouterLink class="w-full" :to="{ name: 'login' }">
      <Button class="w-full">로그인하러 가기</Button>
    </RouterLink>
  </section>
</template>
