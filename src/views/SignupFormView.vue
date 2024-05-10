<script setup lang="ts">
import Button from '@/components/ui/Button.vue'
import Calendar from '@/components/ui/Calendar.vue'
import Dropdown from '@/components/ui/Dropdown.vue'
import Input from '@/components/ui/Input.vue'
</script>

<template>
  <section class="flex flex-col w-full gap-2">
    <div class="flex sm:flex-row flex-col gap-2 w-full">
      <div class="flex flex-col gap-2 pt-4 pb-4 flex-1">
        <h3 class="text-indigo-600 font-semibold text-sm pl-1">회원정보</h3>
        <Input class="w-full" label="이메일" />
        <Input class="w-full" label="비밀번호" type="password" />
        <Input class="w-full" label="비밀번호 확인" type="password" />
        <Input class="w-full" label="닉네임" />
      </div>
      <div class="flex flex-col gap-2 pt-4 pb-4 flex-1">
        <h3 class="text-indigo-600 font-semibold text-sm pl-1">개인정보</h3>
        <Input class="w-full" label="이름" />
        <div class="flex gap-2">
          <Dropdown class="flex-1" :placeholder="'생년월일'" autoClose>
            <Calendar class="h-64" />
          </Dropdown>
          <Dropdown class="w-28" :placeholder="'성별'" autoClose>
            <button class="h-9 hover:bg-indigo-600 hover:text-white">남</button>
            <button class="h-9 hover:bg-indigo-600 hover:text-white">여</button>
          </Dropdown>
        </div>
        <Input class="w-full" label="전화번호" />
      </div>
    </div>
    <Button class="mt-12">다음</Button>
  </section>
</template>
