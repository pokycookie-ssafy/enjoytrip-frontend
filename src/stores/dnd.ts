import type { IAttraction } from '@/types/Attraction'
import { defineStore } from 'pinia'
import { ref } from 'vue'

interface IDataOptions {
  attraction: IAttraction
  height: number
}

export const useDnDStore = defineStore('dnd', () => {
  const data = ref<IDataOptions | null>(null)
  const width = ref(0)

  const startDrag = (options: IDataOptions) => {
    data.value = options
  }
  const endDrag = () => {
    data.value = null
  }
  const setWidth = (w: number) => {
    width.value = w
  }

  return { data, width, startDrag, endDrag, setWidth }
})
