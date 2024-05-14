<script setup lang="ts">
import { ref } from 'vue'

const emits = defineEmits<{
  (e: 'onSubmit', value: string): void
}>()

const inputREF = ref<HTMLParagraphElement | null>(null)
const inFocus = ref(false)

const changeController = (e: KeyboardEvent) => {
  if (!inputREF.value) return
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    emits('onSubmit', inputREF.value.innerText)
    inputREF.value.innerText = ''
  }
}
</script>

<template>
  <p
    class="border w-full outline-none rounded p-2 resize-none text-sm data-[focus=true]:border-indigo-600"
    ref="inputREF"
    :data-focus="inFocus"
    @keydown="changeController"
    @focus="inFocus = true"
    @blur="inFocus = false"
    contenteditable
  ></p>
</template>
