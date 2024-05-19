<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const props = defineProps<{
  icon: string
}>()
</script>

<template>
  <div class="absolute -top-1 flex justify-center items-center">
    <FontAwesomeIcon
      icon="fa-solid fa-bookmark"
      class="text-[50px] text-indigo-500"
    />
    <FontAwesomeIcon :icon="props.icon" class="absolute text-lg text-white" />
  </div>
</template>
