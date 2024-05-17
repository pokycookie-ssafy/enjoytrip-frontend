import { defineStore } from 'pinia'
import { ref } from 'vue'

interface IToastMessage {
  id: string
  message: string
}

export const useToastStore = defineStore('toast', () => {
  const messages = ref<IToastMessage[]>([])

  const addToast = (message: string) => {
    const id = '123'
    messages.value = [...messages.value, { id, message }]
    setTimeout(() => {
      messages.value = messages.value.filter((_, i) => i !== 0)
    }, 3000)
  }

  return { messages, addToast }
})
