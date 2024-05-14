<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Button from './Button.vue'
import CheckBox from './CheckBox.vue'
import axios from 'axios'
import type { ICategory, TCategoryCode } from '@/types/tripCategory'
import AreaSelect from './AreaSelect.vue'

const category = ref<ICategory[]>([])
const selected = ref<Set<TCategoryCode>>(new Set())

const checkHandler = (checked: boolean, code: TCategoryCode) => {
  if (checked) selected.value.add(code)
  else selected.value.delete(code)
}

onMounted(async () => {
  const { data } = await axios.get<ICategory[]>('/categoryCode.json')
  category.value = data
})
</script>

<template>
  <nav
    class="w-56 h-fit p-4 border rounded shadow-lg sticky top-24 flex flex-col gap-2"
  >
    <div class="flex flex-col gap-2 pb-2 border-b">
      <input
        class="border rounded-sm text-sm text-zinc-600 outline-none p-2 pl-2 pr-2"
        placeholder="검색"
      />
    </div>
    <div class="flex flex-col gap-2 pb-2 border-b">
      <AreaSelect />
    </div>
    <div class="flex flex-col gap-1 pb-2 border-b">
      <div
        class="flex justify-start items-center gap-1"
        v-for="(e, i) in category"
        :key="i"
      >
        <CheckBox
          :value="selected.has(e.code)"
          @onClick="(v) => checkHandler(v, e.code)"
        />
        <p class="text-sm text-zinc-700">{{ e.name }}</p>
      </div>
    </div>
    <Button>검색</Button>
  </nav>
</template>
