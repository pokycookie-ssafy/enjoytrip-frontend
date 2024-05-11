<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import noProfile from '@/assets/img/noProfile.svg'

const props = defineProps<{
  editable?: boolean
}>()
</script>

<template>
  <div
    class="flex justify-center items-center rounded-full bg-zinc-300 relative shrink-0"
  >
    <img class="text-white w-full h-full p-[25%]" :src="noProfile" />
    <button
      v-if="props.editable"
      class="w-7 h-7 flex justify-center items-center rounded-full bg-indigo-600 absolute right-0 bottom-0 hover:bg-indigo-500"
    >
      <FontAwesomeIcon icon="fa-solid fa-pen" class="text-white text-xs" />
    </button>
  </div>
</template>
