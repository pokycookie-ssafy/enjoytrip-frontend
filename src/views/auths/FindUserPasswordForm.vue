<script setup lang="ts">
import { api } from '@/axios.config'
import Button from '@/components/ui/Button.vue'
import Input from '@/components/ui/Input.vue'
import type { IResponse } from '@/types/Response'
import { telDecoder, telIncoder, telRool } from '@/utils/telInput'
import { ref } from 'vue'

const email = ref('')
const phone = ref('')
const authCode = ref('')

const submitHandler = async () => {
  try {
    const { data } = await api.post<IResponse<any>>('/users/findpw', {
      email: email.value,
      phone: phone.value,
    })
    console.log(data)
  } catch (err) {
    console.error(err)
  }
}
</script>

<template>
  <h2 class="w-full text-center font-semibold text-indigo-600 text-2xl">
    비밀번호 찾기
  </h2>
  <div class="flex flex-col gap-2">
    <Input label="Email" :value="email" @onChange="(v) => (email = v)" />
    <div class="flex items-center gap-2 w-full">
      <Input
        class="flex-1"
        label="전화번호"
        type="tel"
        :value="phone"
        @onChange="(v) => (phone = v)"
        :encoder="telIncoder"
        :decoder="telDecoder"
        :rule="telRool"
      />
      <Button class="h-full w-32">인증번호 받기</Button>
    </div>
    <Input
      class="flex-1"
      label="인증번호"
      :value="authCode"
      @onChange="(v) => (authCode = v)"
    />
  </div>
  <Button @onClick="submitHandler">찾기</Button>
</template>
