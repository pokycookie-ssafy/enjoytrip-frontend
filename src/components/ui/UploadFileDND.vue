<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const emits = defineEmits<{
  (e: 'onDrop', files: File[]): void
  (e: 'onClick'): void
}>()

const dropHandler = (e: DragEvent) => {
  e.preventDefault()
  if (!e.dataTransfer) return
  if (!e.dataTransfer.files) return

  const files = Array.from(e.dataTransfer.files)
  const imageFiles: File[] = []

  files.forEach((file) => {
    const allowedType = new Set([
      'image/jpg',
      'image/jpeg',
      'image/png',
      'image/jpg',
      'image/webp',
    ])

    if (allowedType.has(file.type)) {
      imageFiles.push(file)
    }
  })

  emits('onDrop', imageFiles)
}

const dragOverHandler = (e: DragEvent) => {
  e.preventDefault()
}
</script>

<template>
  <button
    class="select-none group border-2 w-full flex flex-col gap-2 justify-center items-center flex-1 rounded bg-zinc-100 border-dashed border-zinc-200 hover:border-indigo-600 transition-colors"
    @drop="dropHandler"
    @dragover="dragOverHandler"
    @click="emits('onClick')"
  >
    <FontAwesomeIcon
      class="text-4xl text-zinc-400 group-hover:text-indigo-600 transition-colors"
      icon="fa-solid fa-file-import"
    />
    <p class="group-hover:text-indigo-600 transition-colors text-zinc-400">
      이미지를 끌어서 업로드하세요.
    </p>
  </button>
</template>
