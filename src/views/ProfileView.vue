<script setup lang="ts">
import Button from '@/components/ui/Button.vue'
import Input from '@/components/ui/Input.vue'
import InputGroup from '@/components/ui/InputGroup.vue'
import ProfileImg from '@/components/ui/ProfileImg.vue'
import Toggle from '@/components/ui/Toggle.vue'
</script>

<template>
  <main class="w-vw h-screen flex">
    <section class="shadow w-80 p-8">
      <div class="flex flex-col justify-start items-center p-5 border-b">
        <ProfileImg class="w-20 h-20" editable />
        <h2 class="mt-2 text-xl font-semibold text-zinc-700">Cookie</h2>
        <p class="text-sm text-zinc-400 font-light">cookie@ssafy.com</p>
      </div>
    </section>
    <section class="flex-1 flex justify-center overflow-y-auto">
      <div class="flex flex-col gap-8 w-full max-w-[600px] h-fit pt-24 p-14">
        <InputGroup>
          <div class="flex items-center justify-start gap-4 pb-4 border-b mb-4">
            <ProfileImg class="w-14 h-14" />
            <span>
              <h2 class="text-xl font-semibold text-zinc-700">Cookie</h2>
              <p class="text-sm text-zinc-400 font-light">cookie@ssafy.com</p>
            </span>
          </div>
          <Input class="" label="이름" />
          <Input class="" label="전화번호" />
          <div class="flex justify-end mt-2">
            <Button class="w-24">수정하기</Button>
          </div>
        </InputGroup>

        <InputGroup>
          <h3 class="font-semibold text-zinc-700 border-b pb-4">
            비밀번호 변경
          </h3>
          <Input class="" label="기존 비밀번호" type="password" />
          <Input class="" label="새 비밀번호" type="password" />
          <Input class="" label="새 비밀번호 확인" type="password" />
          <div class="flex justify-end mt-2">
            <Button class="w-24">수정하기</Button>
          </div>
        </InputGroup>

        <InputGroup>
          <h3 class="font-semibold text-zinc-700 border-b pb-4">
            프로모션 정보수신 동의
          </h3>
          <span class="flex justify-between text-zinc-700 pt-2 pb-2">
            <p>휴대전화</p>
            <Toggle />
          </span>
          <span class="flex justify-between text-zinc-700 pt-2 pb-2">
            <p>이메일</p>
            <Toggle />
          </span>
        </InputGroup>
      </div>
    </section>
  </main>
</template>

<style scoped>
.shadow {
  box-shadow: 3px 0px 15px 3px rgba(0, 0, 0, 0.1);
}
</style>
