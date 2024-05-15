import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useScrollStore = defineStore('scroll', () => {
  const scrollable = ref(true)

  const unlock = () => {
    scrollable.value = true
  }

  const lock = () => {
    scrollable.value = false
  }

  watch(scrollable, (scroll) => {
    const app = document.getElementById('app')
    if (app) app.setAttribute('scroll', scroll ? 'true' : 'false')
  })

  return { unlock, lock }
})
