<script setup lang="ts">
import type { IContentType } from '@/types/ContentType'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const props = defineProps<{
  type: IContentType | null
}>()
</script>

<template>
  <div
    class="absolute -top-1 flex justify-center items-center"
    :style="`color: ${props.type?.color ?? 'red'}`"
  >
    <FontAwesomeIcon icon="fa-solid fa-bookmark" class="text-[50px]" />
    <FontAwesomeIcon
      v-if="props.type"
      :icon="props.type.icon"
      class="absolute text-lg text-white top-[13px]"
    />
  </div>
</template>
