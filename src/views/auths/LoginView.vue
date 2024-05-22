<script setup lang="ts">
import { api } from '@/axios.config'
import Button from '@/components/ui/Button.vue'
import Input, { type IInputInfo } from '@/components/ui/Input.vue'
import { useAuthStore } from '@/stores/authStore'
import { useToastStore } from '@/stores/toast'
import type { ILoginResponse } from '@/types/Login'
import type { IResponse } from '@/types/Response'
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const { addToast } = useToastStore()
const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')

const emailInfo = ref<IInputInfo | null>(null)
const passwordInfo = ref<IInputInfo | null>(null)

const loginFailHandler = (data: string) => {
  if (data === '잘못된 이메일 입니다.') {
    emailInfo.value = {
      status: 'danger',
      message: data,
    }
  } else {
    passwordInfo.value = {
      status: 'danger',
      message: data,
    }
  }
}

const loginHandler = (data: ILoginResponse) => {
  api.interceptors.request.use(
    (config) => {
      config.headers['Authorization'] = 'Bearer ' + data.accessToken
      return config
    },
    (err) => {
      return Promise.reject(err)
    }
  )
  // axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.accessToken
  authStore.login(data)
  sessionStorage.setItem('auth', data.accessToken)
  sessionStorage.setItem('user', JSON.stringify(authStore.user))
  router.push({ name: 'home' })
  addToast('로그인 되었습니다')
}

const submitHandler = async () => {
  emailInfo.value = null
  passwordInfo.value = null

  try {
    const { data } = await api.post<IResponse<any>>('/login', {
      email: email.value,
      password: password.value,
    })

    if (data.status === 'success') {
      loginHandler(data.data)
    } else if (data.status === 'error') {
      loginFailHandler(data.data)
    }
    console.log(data)
  } catch (err) {
    console.error(err)
  }
}
</script>

<template>
  <main class="w-vw h-screen flex justify-center items-center">
    <section
      class="p-8 pt-12 pb-12 gap-8 shadow-lg flex flex-col rounded-md border w-full max-w-[450px]"
    >
      <h2 class="w-full text-center font-semibold text-indigo-600 text-2xl">
        Login to your account
      </h2>
      <div class="flex flex-col gap-2">
        <Input
          label="Email"
          :info="emailInfo ?? undefined"
          :value="email"
          @onChange="(v) => (email = v)"
        />
        <Input
          label="Password"
          type="password"
          :value="password"
          :info="passwordInfo ?? undefined"
          @onChange="(v) => (password = v)"
        />
        <RouterLink
          class="text-xs text-indigo-600 w-full text-right hover:text-indigo-500"
          :to="{ name: 'findEmail' }"
        >
          Forgot account?
        </RouterLink>
      </div>
      <Button @click="submitHandler">Login</Button>
      <span class="text-sm w-full text-center"
        >Not a member?
        <RouterLink
          class="text-indigo-600 font-semibold hover:text-indigo-500"
          :to="{ name: 'signup' }"
          >Let's free Sign up</RouterLink
        >
      </span>
    </section>
  </main>
</template>
