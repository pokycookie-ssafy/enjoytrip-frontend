<script setup lang="ts">
import { api } from '@/axios.config'
import Button from '@/components/ui/Button.vue'
import Input from '@/components/ui/Input.vue'
import type { IResponse } from '@/types/Response'
import { telDecoder, telIncoder, telRool } from '@/utils/telInput'
import { ref } from 'vue'

const name = ref('')
const phone = ref('')

const submitHandler = async () => {
  try {
    const { data } = await api.post<IResponse<any>>('/users/findid', {
      name: name.value,
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
    아이디(이메일) 찾기
  </h2>
  <div class="flex flex-col gap-2">
    <Input label="이름" :value="name" @onChange="(v) => (name = v)" />
    <Input
      label="전화번호"
      type="tel"
      :value="phone"
      @onChange="(v) => (phone = v)"
      :encoder="telIncoder"
      :decoder="telDecoder"
      :rule="telRool"
    />
  </div>
  <Button @onClick="submitHandler">찾기</Button>
</template>
