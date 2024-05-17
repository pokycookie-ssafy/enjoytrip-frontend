<script setup lang="ts">
import { formatBytes } from '@/utils/byteConverter'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export interface IUploadedImage {
  file: File
  url: string
}

const props = defineProps<{
  data: IUploadedImage
  index: number
}>()

const emits = defineEmits<{
  (e: 'onDelete', index: number): void
}>()
</script>

<template>
  <div
    class="flex justify-between items-center overflow-hidden border rounded p-1 bg-zinc-100 text-sm"
  >
    <div class="flex gap-2 items-center">
      <img
        class="w-12 h-12 object-cover shrink-0 rounded border border-zinc-300"
        :src="props.data.url"
      />
      <span>
        <p class="text-zinc-700">{{ props.data.file.name }}</p>
        <p class="text-xs text-zinc-500">
          {{ formatBytes(props.data.file.size) }}
        </p>
      </span>
    </div>
    <button
      class="w-8 h-8 flex justify-center items-center text-zinc-500 hover:text-red-600"
      @click="emits('onDelete', props.index)"
    >
      <FontAwesomeIcon icon="fa-solid fa-xmark" />
    </button>
  </div>
</template>
