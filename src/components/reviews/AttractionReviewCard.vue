<script setup lang="ts">
import type { IAttraction } from '@/types/Attraction'
import StarRating from '@/components/ui/StarRating.vue'

const props = defineProps<{
  attraction: IAttraction | null
}>()
</script>

<template>
  <RouterLink
    class="flex flex-col gap-4 border bg-zinc-100 rounded p-3 hover:bg-zinc-200 hover:border-zinc-300 transition-colors"
    :to="'#'"
  >
    <div class="flex justify-between items-center gap-2">
      <h3 class="text-zinc-600 font-semibold text-base flex-1 ellipsis">
        {{ props.attraction?.title }}
      </h3>
      <StarRating class="w-24" :value="7" readonly />
    </div>
    <div class="flex justify-between gap-2 items-center">
      <p class="ellipsis flex-1 text-xs">{{ props.attraction?.addr1 ?? '' }}</p>
    </div>
  </RouterLink>
</template>
