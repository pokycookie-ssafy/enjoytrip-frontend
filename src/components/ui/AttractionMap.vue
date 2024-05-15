<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ref } from 'vue'
import KakaoMap from './KakaoMap.vue'

const props = defineProps<{
  locationName: string
  lat: number
  lng: number
}>()

const isOpen = ref(false)
</script>

<template>
  <section class="flex flex-col bg-zinc-100 border rounded p-4 overflow-hidden">
    <div class="flex justify-between items-start">
      <p class="ellipsis flex-1 text-xs">{{ props.locationName }}</p>
      <button
        class="data-[open=true]:rotate-180 transition-all"
        :data-open="isOpen"
        @click="isOpen = !isOpen"
      >
        <FontAwesomeIcon
          class="hover:text-indigo-600"
          icon="fa-solid fa-chevron-down"
        />
      </button>
    </div>
    <div
      class="data-[open=true]:mt-4 data-[open=true]:h-[250px] h-0 transition-all overflow-hidden rounded"
      :data-open="isOpen"
    >
      <div class="w-full h-[250px]" :data-open="isOpen">
        <KakaoMap
          :markers="[{ lat: props.lat, lng: props.lng }]"
          zoomControl
          v-if="isOpen"
        />
      </div>
    </div>
  </section>
</template>
