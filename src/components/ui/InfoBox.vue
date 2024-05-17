<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ref } from 'vue'

const props = defineProps<{
  title: string
  content: string
}>()

const isOpen = ref(false)
</script>

<template>
  <section
    class="flex flex-col gap-2 p-4 rounded bg-zinc-100 border text-zinc-600"
  >
    <div class="flex justify-between items-center">
      <span class="flex items-center gap-2">
        <FontAwesomeIcon icon="fa-solid fa-circle-info" />
        <h4>{{ props.title }}</h4>
      </span>
      <!-- <button
        class="data-[open=true]:rotate-180 transition-all"
        :data-open="isOpen"
        @click="isOpen = !isOpen"
      >
        <FontAwesomeIcon icon="fa-solid fa-chevron-down" />
      </button> -->
    </div>
    <p class="text-sm">{{ props.content }}</p>
  </section>
</template>
