<script setup lang="ts">
import { QuillEditor } from '@vueup/vue-quill'
import { ref } from 'vue'

const uploadFiles = ref<File[]>([])
const uploadPreviewURLs = ref<string[]>([])

const fileUploadHandler = (e: Event) => {
  const files = (e.target as HTMLInputElement).files
  if (!files) return

  const tmpUploadFiles: File[] = []
  const tmpUploadPreviewURLs: string[] = []

  const fileList = Array.from(files)
  fileList.forEach((file) => {
    tmpUploadFiles.push(file)
    tmpUploadPreviewURLs.push(URL.createObjectURL(file))
  })

  uploadFiles.value = tmpUploadFiles
  uploadPreviewURLs.value = tmpUploadPreviewURLs
}
</script>

<template>
  <main class="w-vw p-24 flex justify-center">
    <section class="flex flex-col w-full max-w-[800px] p-4">
      <input
        class="border text-sm w-full h-10 border-gray-300 outline-none p-3 pr-4 pl-4 rounded mb-3 focus:border-indigo-600"
        placeholder="제목을 입력해 주세요."
      />
      <QuillEditor />
      <div class="mt-3 border rounded p-3 bg-zinc-100 border-zinc-300">
        <input type="file" @change="fileUploadHandler" multiple />
        <div class="flex flex-wrap gap-1">
          <img
            class="w-16 h-16 object-cover shrink-0 rounded border border-zinc-300"
            :src="url"
            v-for="(url, i) in uploadPreviewURLs"
            :key="i"
          />
        </div>
      </div>
    </section>
  </main>
</template>
