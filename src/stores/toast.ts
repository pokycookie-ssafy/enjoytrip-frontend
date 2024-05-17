import { makeID } from '@/utils/key'
import { defineStore } from 'pinia'
import { ref } from 'vue'

type TToastMessage = 'normal' | 'danger'

interface IToastMessage {
  id: string
  message: string
  type: TToastMessage
}

export const useToastStore = defineStore('toast', () => {
  const messages = ref<IToastMessage[]>([])

  const addToast = (message: string, type?: TToastMessage) => {
    const id = makeID(32)
    messages.value = [
      ...messages.value,
      { id, message, type: type ?? 'normal' },
    ]
    setTimeout(() => {
      messages.value = messages.value.filter((_, i) => i !== 0)
    }, 3000)
  }

  return { messages, addToast }
})
