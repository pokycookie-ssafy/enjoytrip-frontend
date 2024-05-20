import { defineStore } from 'pinia'
import { ref } from 'vue'

interface IOffset {
  offsetX: number
  offsetY: number
  start: Date
}

export const useResizeStore = defineStore('resize', () => {
  const offset = ref<IOffset | null>(null)
  const height = ref(0)

  const setOffset = (e: IOffset) => {
    offset.value = e
  }

  const clear = () => {
    offset.value = null
    height.value = 0
  }

  const setHeight = (h: number) => {
    height.value = h
  }

  return { offset, height, setOffset, setHeight, clear }
})
