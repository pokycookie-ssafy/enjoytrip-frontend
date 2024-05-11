<script setup lang="ts">
import Button from '@/components/ui/Button.vue'
import Input from '@/components/ui/Input.vue'
</script>

<template>
  <h2 class="w-full text-center font-semibold text-indigo-600 text-2xl">
    비밀번호 찾기
  </h2>
  <div class="flex flex-col gap-2">
    <Input label="Email" />
    <div class="flex items-center gap-2 w-full">
      <Input class="flex-1" label="전화번호" type="tel" />
      <Button class="h-full w-32">인증번호 받기</Button>
    </div>
    <Input class="flex-1" label="인증번호" />
  </div>
  <Button class="">찾기</Button>
</template>
