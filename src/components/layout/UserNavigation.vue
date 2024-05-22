<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Caption from '../ui/Caption.vue'
import { useToastStore } from '@/stores/toast'
import { useAuthStore } from '@/stores/authStore'
import { api } from '@/axios.config'

const hover = ref(false)

const router = useRouter()
const { addToast } = useToastStore()
const authStore = useAuthStore()

const mouseoverHandler = () => {
  hover.value = true
}

const mouseoutHandler = () => {
  hover.value = false
}

const logout = async () => {
  api.get('/logout')
  authStore.logout()
  sessionStorage.removeItem('auth')
  sessionStorage.removeItem('user')
  addToast('로그아웃 되었습니다')
  router.go(0)
}

const clickHandler = () => {
  if (authStore.user) {
    router.push({ name: 'profile' })
  } else {
    router.push({ name: 'login' })
  }
}
</script>

<template>
  <div
    class="fixed right-5 bottom-5 flex justify-end items-end text-sm text-white z-[998] data-[hover=true]:h-28"
    @mouseover="mouseoverHandler"
    @mouseout="mouseoutHandler"
    :data-hover="hover"
  >
    <div class="flex justify-center items-center">
      <div
        class="absolute flex items-center group/logout transition-all data-[hover=false]:opacity-0 data-[hover=true]:-translate-y-14"
        v-if="authStore.user"
        :data-hover="hover"
      >
        <button
          class="flex justify-center items-center w-10 h-10 rounded-full overflow-hidden bg-gray-800 border-gray-900 hover:bg-red-600"
          @click="logout"
        >
          <FontAwesomeIcon icon="fa-solid fa-xmark" />
        </button>
        <Caption
          text="로그아웃"
          class="-left-20 group-hover/logout:opacity-100 opacity-0 transition-all"
        />
      </div>
      <div class="flex items-center justify-center group/profile relative">
        <button
          class="duration-300 hover:bg-indigo-500 hover:border-indigo-400 cursor-pointer flex justify-center border-2 border-indigo-500 items-center transition-all w-11 h-11 shrink-0 bg-indigo-600 rounded-full shadow-md data-[hover=true]:scale-125"
          :to="{ name: 'profile' }"
          @click="clickHandler"
          :data-hover="hover"
        >
          <FontAwesomeIcon icon="fa-solid fa-user" />
        </button>
        <Caption
          text="프로필 보기"
          v-if="authStore.user"
          class="-left-24 group-hover/profile:opacity-100 opacity-0 transition-all"
        />
        <Caption
          text="로그인"
          v-if="!authStore.user"
          class="-left-[4.5rem] group-hover/profile:opacity-100 opacity-0 transition-all"
        />
      </div>
    </div>
  </div>
</template>
