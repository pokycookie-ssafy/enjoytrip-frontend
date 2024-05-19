<script setup lang="ts">
import { ref } from 'vue'
import Button from '@/components/ui/Button.vue'
import CheckBox from '@/components/ui/CheckBox.vue'
import AreaSelect from '@/components/ui/AreaSelect.vue'
import type { IContentType } from '@/types/ContentType'
import contentType from '@/assets/data/contentType'

const category = ref<IContentType[]>(contentType)
const selected = ref<Set<number>>(new Set())

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
        placeholder="검색"
      />
    </div>
    <div class="flex flex-col gap-2 pb-2 border-b">
      <AreaSelect useEntire />
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
