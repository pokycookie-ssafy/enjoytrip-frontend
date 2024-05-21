<script setup lang="ts">
import Steps from '@/components/ui/Steps.vue'
import SignupTermView from './SignupTermView.vue'
import SignupFormView from './SignupFormView.vue'
import { ref } from 'vue'

const stepLabels = ['약관동의', '회원정보입력', '가입완료']

const step = ref(1)
</script>

<template>
  <main class="v-vw p-12 pt-24 flex justify-center">
    <section class="max-w-[700px] w-full flex flex-col">
      <Steps class="mb-10" :labels="stepLabels" :step="step" />
      <SignupTermView v-show="step == 1" @onNext="step++" />
      <SignupFormView v-show="step == 2" />
    </section>
  </main>
</template>
