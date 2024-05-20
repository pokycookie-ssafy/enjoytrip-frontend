import type { IUser } from '@/types/User'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<IUser | null>(null)

  const login = (u: IUser) => {
    user.value = u
  }

  const logout = () => {
    user.value = null
  }

  return { user, login, logout }
})
