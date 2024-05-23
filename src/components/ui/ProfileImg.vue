<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import noProfile from '@/assets/img/noProfile.svg'
import { useToastStore } from '@/stores/toast'
import { api } from '@/axios.config'
import { useAuthStore } from '@/stores/authStore'

const props = defineProps<{
  editable?: boolean
  src?: string | null
}>()

const { addToast } = useToastStore()
const authStore = useAuthStore()

const editHandler = () => {
  const link = document.createElement('input')
  link.type = 'file'
  link.accept = 'image/*'
  link.addEventListener('change', inputFileUploadHandler)

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const inputFileUploadHandler = (e: Event) => {
  const files = (e.target as HTMLInputElement).files
  if (!files) return
  if (files.length === 0) return
  uploadFile(Array.from(files)[0])
}

const uploadFile = async (file: File) => {
  const formData = new FormData()
  formData.append('profile', file)

  try {
    const { data } = await api.post(`/users/profile`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    console.log(data)
    if (data.status === 'success') {
      addToast('프로필 이미지 등록에 성공했습니다')
      authStore.setProfile(data.data)

      const userStr = sessionStorage.getItem('user')
      if (userStr) {
        const user = JSON.parse(userStr)
        user.profileImage = data.data
        sessionStorage.setItem('user', JSON.stringify(user))
      }
    } else {
      addToast('프로필 이미지 등록에 실패했습니다', 'danger')
    }
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div class="flex justify-center items-center relative shrink-0">
    <div class="rounded-full bg-zinc-300 overflow-hidden w-full h-full">
      <img
        class="w-full h-full object-cover"
        v-if="props.src"
        :src="props.src"
      />
      <img
        class="text-white w-full h-full p-[25%]"
        v-if="!props.src"
        :src="noProfile"
      />
    </div>
    <button
      v-if="props.editable"
      class="w-7 h-7 flex justify-center items-center rounded-full bg-indigo-600 absolute right-0 bottom-0 hover:bg-indigo-500"
      @click="editHandler"
    >
      <FontAwesomeIcon icon="fa-solid fa-pen" class="text-white text-xs" />
    </button>
  </div>
</template>
