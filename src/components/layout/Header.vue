<script setup lang="ts">
import { useRouter } from 'vue-router'
import Button from '../ui/Button.vue'
import { ref } from 'vue'

const router = useRouter()
const hover = ref(false)

interface IHeaderLink {
  label: string
  name: string
}

const links: IHeaderLink[] = [
  { label: 'Home', name: 'home' },
  { label: 'Board', name: 'board' },
  { label: 'Map', name: 'map' },
  { label: 'Calendar', name: '' },
]

const loginBtnHandler = () => {
  router.push({ name: 'login' })
}

const mouseoverHandler = () => {
  hover.value = true
}

const mouseoutHandler = () => {
  hover.value = false
}
</script>

<template>
  <header
    class="w-vw p-4 flex justify-center items-center fixed left-0 top-0 z-[999] select-none"
    :onMouseover="mouseoverHandler"
    :onMouseout="mouseoutHandler"
  >
    <section
      class="w-full max-w-[500px] data-[hover=false]:-translate-y-20 data-[hover=false]:opacity-0 duration-300 transition-all h-16 rounded-md bg-gray-800 p-3 flex justify-between bg-opacity-80 text-white backdrop-blur-sm shadow-md"
      :data-hover="hover"
    >
      <div class="flex gap-2 h-full">
        <RouterLink
          class="h-full p-2 pl-3 pr-3 flex justify-center items-center transition-colors rounded hover:bg-gray-900 hover:bg-opacity-50"
          v-for="(e, i) in links"
          :key="i"
          :to="{ name: e.name }"
        >
          {{ e.label }}
        </RouterLink>
      </div>
      <div class="flex gap-2">
        <Button class="w-20" @onClick="loginBtnHandler">Login</Button>
      </div>
    </section>
  </header>
</template>
