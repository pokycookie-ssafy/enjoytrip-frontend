<script setup lang="ts">
import term from '@/assets/data/term'
import Button from '@/components/ui/Button.vue'
import CheckBox from '@/components/ui/CheckBox.vue'
import { ref } from 'vue'

const emits = defineEmits<{
  (e: 'onNext'): void
}>()

const serviceTerm = ref(term.service)
const personalTerm = ref(term.personal)

const serviceCheck = ref(false)
const personalCheck = ref(false)

const nextHandler = () => {
  if (serviceCheck.value && personalCheck.value) emits('onNext')
}
</script>

<template>
  <section class="flex flex-col gap-2 w-full">
    <h2 class="w-full text-center text-xl text-indigo-600 font-semibold">
      약관동의
    </h2>

    <h3 class="text-indigo-600 font-semibold text-sm pl-1 mt-12">
      서비스 이용약관
    </h3>
    <textarea
      class="w-full h-72 resize-none text-sm outline-none border rounded pl-6 pr-6 p-3"
      readonly
      >{{ serviceTerm }}</textarea
    >
    <div
      class="flex gap-1 w-full justify-end items-center cursor-pointer"
      @click="serviceCheck = !serviceCheck"
    >
      <CheckBox :value="serviceCheck" />
      <p
        class="text-zinc-600 text-sm select-none font-semibold data-[selected=true]:text-indigo-600"
        :data-selected="serviceCheck === true"
      >
        동의합니다
      </p>
    </div>

    <h3 class="text-indigo-600 font-semibold text-sm pl-1 mt-12">
      개인정보 수집 및 이용 동의
    </h3>
    <textarea
      class="w-full h-72 resize-none text-sm outline-none border rounded pl-6 pr-6 p-3"
      readonly
      >{{ personalTerm }}</textarea
    >
    <div
      class="flex gap-1 w-full justify-end items-center cursor-pointer"
      @click="personalCheck = !personalCheck"
    >
      <CheckBox :value="personalCheck" />
      <p
        class="text-zinc-600 text-sm select-none font-semibold data-[selected=true]:text-indigo-600"
        :data-selected="personalCheck === true"
      >
        동의합니다
      </p>
    </div>
    <Button class="mt-12" @onClick="nextHandler">다음</Button>
  </section>
</template>
