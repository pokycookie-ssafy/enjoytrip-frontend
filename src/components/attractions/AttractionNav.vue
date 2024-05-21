<script setup lang="ts">
import { ref, watch } from 'vue'
import Button from '@/components/ui/Button.vue'
import CheckBox from '@/components/ui/CheckBox.vue'
import AreaSelect from '@/components/ui/AreaSelect.vue'
import type { IContentType } from '@/types/ContentType'
import contentType from '@/assets/data/contentType'
import type { IArea } from '@/types/SidoGugun'
import { useRoute } from 'vue-router'

const emits = defineEmits<{
  (e: 'onSubmit', query: string): void
}>()

const route = useRoute()

const category = ref<IContentType[]>(contentType)

const search = ref('')
const sidoCode = ref<number | null>(null)
const gugunCode = ref<number | null>(null)
const selected = ref<Set<number>>(new Set())

const submitHandler = () => {
  const queryArr = []
  if (search.value.trim() !== '') {
    queryArr.push(`search=${search.value}`)
  }
  if (sidoCode.value) {
    queryArr.push(`sido=${sidoCode.value}`)
    if (gugunCode.value) queryArr.push(`gugun=${gugunCode.value}`)
  }
  selected.value.forEach((e) => {
    queryArr.push(`type=${e}`)
  })

  const queryString = queryArr.join('&')
  emits('onSubmit', queryString)
}

const areaHandler = (sido: IArea | null, gugun: IArea | null) => {
  sidoCode.value = sido?.code ?? null
  gugunCode.value = gugun?.code ?? null
}

const searchHandler = (e: Event) => {
  search.value = (e.target as HTMLInputElement)?.value ?? ''
}

const checkHandler = (checked: boolean, code: number) => {
  if (checked) selected.value.add(code)
  else selected.value.delete(code)
}
</script>

<template>
  <nav
    class="w-56 h-fit p-4 border rounded shadow-lg sticky top-24 flex flex-col gap-2"
  >
    <div class="flex flex-col gap-2 pb-2 border-b">
      <input
        class="border rounded-sm text-sm text-zinc-600 outline-none p-2 pl-2 pr-2"
        :value="search"
        @change="searchHandler"
        placeholder="검색"
      />
    </div>
    <div class="flex flex-col gap-2 pb-2 border-b">
      <AreaSelect useEntire @onChange="areaHandler" />
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
    <Button @onClick="submitHandler">검색</Button>
  </nav>
</template>
