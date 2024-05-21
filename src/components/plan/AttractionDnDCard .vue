<script setup lang="ts">
import type { IAttraction } from '@/types/Attraction'
import AttractionCategoryLabel from '../attractions/AttractionCategoryLabel.vue'
import { computed, ref } from 'vue'
import contentType from '@/assets/data/contentType'
import { useDnDStore } from '@/stores/dnd'
import type { IContentType } from '@/types/ContentType'

const props = defineProps<{
  data: IAttraction
}>()

const dndStore = useDnDStore()

const type = ref<IContentType | null>(
  contentType.find((e) => e.code === props.data.contentTypeId) ?? null
)

const addr = computed(() => {
  if (props.data.addr1.trim() === '') return '위치 정보 없음'
  return props.data.addr1
})

const mousedownHandler = () => {
  dndStore.startDrag({
    attraction: props.data,
    height: 1,
  })
  window.addEventListener('mouseup', () => {
    dndStore.endDrag()
  })
}
</script>

<template>
  <button
    class="select-none overflow-hidden pt-1 shrink-0"
    @mousedown="mousedownHandler"
  >
    <div
      class="relative border rounded p-2 w-full bg-zinc-100 border-zinc-200 hover:bg-zinc-200 hover:border-zinc-300 text-zinc-800"
    >
      <p class="ellipsis mb-1 text-left">{{ props.data.title }}</p>
      <p class="ellipsis text-xs text-zinc-700 text-left">{{ addr }}</p>
      <AttractionCategoryLabel class="right-2" :type="type" />
    </div>
  </button>
</template>
