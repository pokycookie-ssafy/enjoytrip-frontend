<script setup lang="ts">
import Button from '@/components/ui/Button.vue'
import UploadFileDND from '@/components/ui/UploadFileDND.vue'
import UploadedImgPreview from '@/components/ui/UploadedImgPreview.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { QuillEditor } from '@vueup/vue-quill'
import axios from 'axios'
import ImageUploader from 'quill-image-uploader'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

interface IUploadedImage {
  file: File
  url: string
}

const router = useRouter()

const title = ref('')
const content = ref('')
const uploadFiles = ref<IUploadedImage[]>([])

const quillToolbarOptions = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  ['link', 'formula'],
  // ['link', 'image', 'formula'],
]

const quillModuleOptions = {
  name: 'imageUploader',
  module: ImageUploader,
  options: {
    upload: (file: File) => uploadFile([file]),
  },
}

const sumbmitHandler = async () => {
  const formData = new FormData()

  formData.append('title', title.value)
  formData.append('content', content.value)
  uploadFiles.value.forEach((upload) => {
    formData.append('images', upload.file)
  })

  try {
    const { data } = await axios.post('/boards', formData, {
      headers: {
        'Content-Type': 'multiple/form-data',
      },
    })
    console.log(data)
    router.push({ name: 'board' })
  } catch (err) {
    console.error(err)
  }
}

const titleHandler = (e: Event) => {
  const text = (e.target as HTMLInputElement).value
  title.value = text
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

const uploadFile = (files: File[]) => {
  const tmpUploadFiles: IUploadedImage[] = []
  files.forEach((file) => {
    tmpUploadFiles.push({ file, url: URL.createObjectURL(file) })
  })
  uploadFiles.value = tmpUploadFiles
}

const deleteFileHandler = (index: number) => {
  const tmpUploadFiles = [...uploadFiles.value]
  tmpUploadFiles.splice(index, 1)
  uploadFiles.value = tmpUploadFiles
}
</script>

<template>
  <main class="w-vw p-24 flex justify-center">
    <section class="flex flex-col w-full max-w-[800px] p-4">
      <div
        class="flex justify-between items-center gap-1 pb-2 mb-2 border-b border-zinc-300"
      >
        <span
          class="flex justify-start items-center gap-2 text-zinc-600 font-semibold text-lg"
        >
          <RouterLink class="hover:underline" :to="{ name: 'board' }"
            >자유게시판</RouterLink
          >
          <FontAwesomeIcon class="text-sm" icon="fa-solid fa-angle-right" />
          <p>글쓰기</p>
        </span>
      </div>
      <input
        class="border text-sm w-full h-10 border-gray-300 outline-none p-3 pr-4 pl-4 rounded mb-3 focus:border-indigo-600"
        :value="title"
        @change="titleHandler"
        placeholder="제목을 입력해 주세요."
      />
      <QuillEditor
        v-model:content="content"
        content-type="html"
        :toolbar="quillToolbarOptions"
        :modules="quillModuleOptions"
      />
      <div
        class="mt-3 border rounded p-3 bg-zinc-50 border-zinc-300 flex flex-col"
      >
        <div class="flex flex-col gap-2 w-full h-60">
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
      </div>
      <div class="pt-4">
        <Button class="w-full" @onClick="sumbmitHandler">등록</Button>
      </div>
    </section>
  </main>
</template>
