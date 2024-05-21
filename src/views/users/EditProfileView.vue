<script setup lang="ts">
import Button from '@/components/ui/Button.vue'
import Input from '@/components/ui/Input.vue'
import InputGroup from '@/components/ui/InputGroup.vue'
import ProfileImg from '@/components/ui/ProfileImg.vue'
import Toggle from '@/components/ui/Toggle.vue'
import { useAuthStore } from '@/stores/authStore'
import { useToastStore } from '@/stores/toast'
import type { IResponse } from '@/types/Response'
import type { IUserResponse } from '@/types/User'
import { telDecoder, telIncoder, telRool } from '@/utils/telInput'
import axios from 'axios'
import { onMounted, ref } from 'vue'

const authStore = useAuthStore()
const toastStore = useToastStore()

const nickname = ref('')
const name = ref('')
const phone = ref('')
const password = ref('')
const newPassword = ref('')
const newPasswordCheck = ref('')

const editHandler = async () => {
  try {
    const { data } = await axios.patch('/users', {
      nickname: nickname.value,
      phone: phone.value,
    })
    console.log(data)
    if (data.status === 'success') {
      toastStore.addToast('유저정보가 변경되었습니다')
    }
  } catch (err) {
    console.error(err)
  }
}

const passwordEditHandler = async () => {
  try {
    const { data } = await axios.patch('/users', {
      password: newPassword.value,
    })
    console.log(data)
    if (data.status === 'success') {
      toastStore.addToast('비밀번호가 변경되었습니다')
    }
  } catch (err) {
    console.error(err)
  }
}

onMounted(async () => {
  if (!authStore.user) return
  try {
    const { data } = await axios.get<IResponse<IUserResponse>>('/users')
    nickname.value = data.data.nickname
    name.value = data.data.name
    phone.value = data.data.phone
  } catch (err) {
    console.error(err)
  }
})
</script>

<template>
  <section class="flex-1 flex justify-center overflow-y-auto">
    <div class="flex flex-col gap-8 w-full max-w-[600px] h-fit pt-24 p-14">
      <InputGroup>
        <div class="flex items-center justify-start gap-4 pb-4 border-b mb-4">
          <ProfileImg class="w-14 h-14" />
          <span>
            <h2 class="text-xl font-semibold text-zinc-700">
              {{ authStore?.user?.nickname ?? 'nickname' }}
            </h2>
            <p class="text-sm text-zinc-400 font-light">
              {{ authStore?.user?.email ?? 'email' }}
            </p>
          </span>
        </div>
        <Input
          label="이름"
          :value="name"
          @onChange="(v) => (name = v)"
          readonly
        />
        <Input
          label="닉네임"
          :value="nickname"
          @onChange="(v) => (nickname = v)"
        />
        <Input
          label="전화번호"
          :value="phone"
          @onChange="(v) => (phone = v)"
          :encoder="telIncoder"
          :decoder="telDecoder"
          :rule="telRool"
        />
        <div class="flex justify-end mt-2">
          <Button class="w-24" @onClick="editHandler">수정하기</Button>
        </div>
      </InputGroup>

      <InputGroup>
        <h3 class="font-semibold text-zinc-700 border-b pb-4">비밀번호 변경</h3>
        <Input
          label="기존 비밀번호"
          type="password"
          :value="password"
          @onChange="(v) => (password = v)"
        />
        <Input
          label="새 비밀번호"
          type="password"
          :value="newPassword"
          @onChange="(v) => (newPassword = v)"
        />
        <Input
          label="새 비밀번호 확인"
          type="password"
          :value="newPasswordCheck"
          @onChange="(v) => (newPasswordCheck = v)"
        />
        <div class="flex justify-end mt-2">
          <Button class="w-24" @onClick="passwordEditHandler">수정하기</Button>
        </div>
      </InputGroup>

      <InputGroup>
        <h3 class="font-semibold text-zinc-700 border-b pb-4">
          프로모션 정보수신 동의
        </h3>
        <span class="flex justify-between text-zinc-700 pt-2 pb-2 text-sm">
          <p>휴대전화 정보수신 동의</p>
          <Toggle />
        </span>
        <span class="flex justify-between text-zinc-700 pt-2 pb-2 text-sm">
          <p>이메일 정보수신 동의</p>
          <Toggle />
        </span>
      </InputGroup>
    </div>
  </section>
</template>
