<script setup lang="ts">
import type { IAttraction } from '@/types/Attraction'
import AttractionCategoryLabel from '../attractions/AttractionCategoryLabel.vue'
import { ref } from 'vue'
import CheckBox from '../ui/CheckBox.vue'
import contentType from '@/assets/data/contentType'

const props = defineProps<{
  data: IAttraction
}>()

const icon = ref<string>(
  contentType.find((e) => e.code === props.data.contentType)?.icon ?? ''
)
</script>

<template>
  <RouterLink
    class="overflow-hidden pt-1 shrink-0"
    :to="`/attractions/?id=${props.data.contentId}`"
  >
    <div
      class="relative border rounded p-2 w-full bg-zinc-100 border-zinc-200 hover:bg-zinc-200 hover:border-zinc-300 text-zinc-800"
    >
      <CheckBox class="mb-2" :value="true" />
      <p class="ellipsis mb-1">{{ props.data.title }}</p>
      <p class="ellipsis text-xs text-zinc-700 mb-3">{{ props.data.addr1 }}</p>
      <!-- <div class="flex items-center gap-1 p-1">
        <FontAwesomeIcon icon="fa-regular fa-eye" />
      </div> -->
      <AttractionCategoryLabel class="right-2" :icon="icon" />
    </div>
  </RouterLink>
</template>
