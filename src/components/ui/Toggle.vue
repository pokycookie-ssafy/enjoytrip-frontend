<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  value?: boolean
}>()

const emits = defineEmits<{
  (e: 'onChange', value: boolean): void
}>()

const value = ref(props.value ?? false)

const toggle = () => {
  value.value = !value.value
}

watch(
  () => props.value,
  () => {
    value.value = props.value
  }
)

watch(value, (value) => {
  emits('onChange', value)
})
</script>

<template>
  <button
    class="bg-zinc-200 w-10 h-5 border-2 rounded-full box-content outline-none flex items-center transition-colors data-[value=true]:bg-indigo-600 data-[value=true]:border-indigo-600"
    :data-value="value"
    @click="toggle()"
  >
    <span
      class="w-5 h-5 rounded-full relative left-0 bg-white block data-[value=true]:left-5 transition-all"
      :data-value="value"
    ></span>
  </button>
</template>
