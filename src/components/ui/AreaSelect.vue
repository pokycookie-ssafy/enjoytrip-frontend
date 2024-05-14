<script setup lang="ts">
import Dropdown from '@/components/ui/Dropdown.vue'
import axios from 'axios'
import { onMounted, ref, watch } from 'vue'

interface IArea {
  code: string
  name: string
}

interface ISido {
  code: string
  name: string
  details: IArea[]
}

const sido = ref<IArea | null>(null)
const gugun = ref<IArea | null>(null)

const sidos = ref<ISido[]>([])
const guguns = ref<IArea[]>([])

onMounted(async () => {
  const { data } = await axios.get('/areaCode.json')
  sidos.value = data
})

watch([sidos, sido], ([sidos, sido]) => {
  gugun.value = null
  guguns.value = sidos.find((e) => e.code == sido?.code)?.details ?? []
})
</script>

<template>
  <div class="flex flex-col gap-2">
    <Dropdown class="w-full" :placeholder="sido?.name ?? '지역'" autoClose>
      <button
        class="dropdown-li"
        v-for="(e, i) in sidos"
        :key="i"
        @click="sido = { code: e.code, name: e.name }"
      >
        {{ e.name }}
      </button>
    </Dropdown>
    <Dropdown class="w-full" :placeholder="gugun?.name ?? '세부지역'" autoClose>
      <button v-if="!sido" class="dropdown-li">지역을 선택해주세요</button>
      <button
        class="dropdown-li"
        v-for="(e, i) in guguns"
        :key="i"
        @click="gugun = { code: e.code, name: e.name }"
      >
        {{ e.name }}
      </button>
    </Dropdown>
  </div>
</template>
