<script setup lang="ts">
import areaCode from '@/assets/data/areaCode'
import Dropdown from '@/components/ui/Dropdown.vue'
import type { IArea, IGugun, ISido } from '@/types/SidoGugun'
import { computed, onMounted, ref, watch } from 'vue'

const props = defineProps<{
  useEntire?: boolean
}>()

const sido = ref<IArea | null>(null)
const gugun = ref<IArea | null>(null)

const sidos = ref<ISido[]>(areaCode)
const guguns = ref<IGugun[]>([])

const sidoPlaceholder = computed(() => {
  if (sido.value) return sido.value.name
  if (props.useEntire) return '전체'
  else return '지역'
})

const gugunPlaceholder = computed(() => {
  if (gugun.value) return gugun.value.name
  if (props.useEntire) return '전체'
  else return '세부지역'
})

watch([sidos, sido], ([sidos, sido]) => {
  gugun.value = null
  guguns.value = sidos.find((e) => e.code == sido?.code)?.details ?? []
})
</script>

<template>
  <div class="flex flex-col gap-2">
    <Dropdown class="w-full" :placeholder="sidoPlaceholder" autoClose>
      <button v-if="props.useEntire" class="dropdown-li" @click="sido = null">
        전체
      </button>
      <button
        class="dropdown-li"
        v-for="(e, i) in sidos"
        :key="i"
        @click="sido = { code: e.code, name: e.name }"
      >
        {{ e.name }}
      </button>
    </Dropdown>
    <Dropdown class="w-full" :placeholder="gugunPlaceholder" autoClose>
      <button v-if="!sido && !props.useEntire" class="dropdown-li">
        지역을 선택해주세요
      </button>
      <button v-if="props.useEntire" class="dropdown-li" @click="gugun = null">
        전체
      </button>
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
