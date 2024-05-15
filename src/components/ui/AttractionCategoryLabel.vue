<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const props = defineProps<{
  icon: string | null
}>()
</script>

<template>
  <div class="absolute right-4 -top-1 flex justify-center items-center">
    <FontAwesomeIcon
      icon="fa-solid fa-bookmark"
      class="text-[50px] text-indigo-500"
    />
    <FontAwesomeIcon
      v-if="props.icon"
      :icon="props.icon"
      class="absolute text-lg text-white"
    />
  </div>
</template>
