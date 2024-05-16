<script setup lang="ts">
import Button from '@/components/ui/Button.vue'
import Input from '@/components/ui/Input.vue'
</script>

<template>
  <h2 class="w-full text-center font-semibold text-indigo-600 text-2xl">
    아이디(이메일) 찾기
  </h2>
  <div class="flex flex-col gap-2">
    <Input label="이름" />
    <Input label="전화번호" type="tel" />
  </div>
  <Button class="">찾기</Button>
</template>
