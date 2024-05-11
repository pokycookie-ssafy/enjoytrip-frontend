<script setup lang="ts">
import Button from '@/components/ui/Button.vue'
import Input from '@/components/ui/Input.vue'
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
        <Input label="Email" />
        <Input label="Password" type="password" />
        <RouterLink
          class="text-xs text-indigo-600 w-full text-right hover:text-indigo-500"
          :to="{ name: 'findEmail' }"
        >
          Forgot account?
        </RouterLink>
      </div>
      <Button>Login</Button>
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
