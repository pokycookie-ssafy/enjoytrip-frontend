<script setup lang="ts">
import Button from '@/components/ui/Button.vue'
import StarRating from '@/components/ui/StarRating.vue'
import UploadFileDND from '@/components/ui/UploadFileDND.vue'
import UploadedImgPreview from '@/components/ui/UploadedImgPreview.vue'
import type { IAttraction } from '@/types/Attraction'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { QuillEditor } from '@vueup/vue-quill'
import { ref } from 'vue'

interface IUploadedImage {
  file: File
  url: string
}

const props = defineProps<{
  attraction: IAttraction
}>()

const emits = defineEmits<{
  (e: 'onSubmit'): void
}>()

const quillToolbarOptions = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ['bold', 'italic', 'underline', 'strike'],
  ['link', 'blockquote'],
]

const content = ref('')
const uploadFiles = ref<IUploadedImage[]>([])
const rate = ref(0)

const sumbmitHandler = () => {}

const uploadFile = (files: File[]) => {
  const tmpUploadFiles: IUploadedImage[] = []
  files.forEach((file) => {
    tmpUploadFiles.push({ file, url: URL.createObjectURL(file) })
  })
  uploadFiles.value = tmpUploadFiles
}

const uploadHandler = () => {
  const link = document.createElement('input')
  link.type = 'file'
  link.accept = 'image/*'
  link.setAttribute('multiple', 'true')
  link.addEventListener('change', inputFileUploadHandler)

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const inputFileUploadHandler = (e: Event) => {
  const files = (e.target as HTMLInputElement).files
  if (!files) return
  if (files.length === 0) return
  uploadFile(Array.from(files))
}

const deleteFileHandler = (index: number) => {
  const tmpUploadFiles = [...uploadFiles.value]
  tmpUploadFiles.splice(index, 1)
  uploadFiles.value = tmpUploadFiles
}
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-2 p-2">
      <span
        class="flex flex-1 items-center gap-2 text-zinc-600 overflow-hidden"
      >
        <h2 class="text-xl ellipsis">리뷰쓰기</h2>
        <FontAwesomeIcon class="text-sm" icon="fa-solid fa-angle-right" />
        <h2 class="text-lg ellipsis">{{ props.attraction.title }}</h2>
      </span>
      <StarRating class="w-24" :value="rate" @onChange="(v) => (rate = v)" />
    </div>
    <QuillEditor
      v-model:content="content"
      content-type="html"
      :toolbar="quillToolbarOptions"
    />
    <div class="flex flex-col gap-2 w-full h-60 mt-2">
      <UploadFileDND @onDrop="uploadFile" @onClick="uploadHandler" />
    </div>
    <div
      class="flex flex-col flex-1 gap-1 pt-2 border-t mt-2 border-zinc-300"
      v-show="uploadFiles.length > 0"
    >
      <UploadedImgPreview
        v-for="(upload, i) in uploadFiles"
        :data="upload"
        :index="i"
        :key="i"
        @onDelete="deleteFileHandler"
      />
    </div>
    <Button class="w-full mt-2" @click="sumbmitHandler">리뷰 작성</Button>
  </div>
</template>
