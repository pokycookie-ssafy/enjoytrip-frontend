<script setup lang="ts">
import Button from '@/components/ui/Button.vue'
import Input, { type IInputInfo } from '@/components/ui/Input.vue'
import axios from 'axios'
import { ref } from 'vue'

const email = ref('')
const password = ref('')

const emailInfo = ref<IInputInfo | null>(null)
const passwordInfo = ref<IInputInfo | null>(null)

const submitHandler = async () => {
  try {
    axios.post('/api/login', {
      email: email.value,
      password: password.value,
    })
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
        <Input label="Email" @onChange="(v) => (email = v)" />
        <Input
          label="Password"
          type="password"
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
