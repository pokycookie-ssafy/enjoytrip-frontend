<script setup lang="ts">
import { computed, ref, watch, type InputTypeHTMLAttribute } from 'vue'

export interface IInputInfo {
  status: 'success' | 'warn' | 'danger'
  message: string
}

const props = defineProps<{
  value: string
  label?: string
  type?: InputTypeHTMLAttribute
  info?: IInputInfo
  readonly?: boolean
  encoder?: (input: string) => string
  decoder?: (input: string) => string
  rule?: (key: string) => boolean
}>()

const emits = defineEmits<{
  (e: 'onChange', value: string): void
}>()

const inputShow = ref('')
const focus = ref(false)
const inputREF = ref<HTMLInputElement | null>(null)

const isEmpty = computed(() => {
  return props.value.length === 0
})

const keydownHandler = (e: KeyboardEvent) => {
  if (props.rule && !props.rule(e.key)) e.preventDefault()
}

const inputHandler = (e: Event) => {
  const targetValue = (e.target as HTMLInputElement).value
  const value = props.decoder ? props.decoder(targetValue) : targetValue
  inputShow.value = props.encoder ? props.encoder(value) : value
  emits('onChange', value)
}

const onFocus = () => {
  focus.value = true
  if (inputREF) inputREF.value?.focus()
}

const onBlur = () => {
  focus.value = false
}

watch(
  () => props.value,
  () => {
    inputShow.value = props.encoder ? props.encoder(props.value) : props.value
  },
  { immediate: true }
)
</script>

<template>
  <div
    class="flex flex-col justify-center min-h-10 overflow-hidden border p-2 data-[readonly=true]:bg-zinc-100 data-[focus=true]:border-indigo-600 rounded transition-all data-[status='success']:border-indigo-500 data-[status='warn']:border-yellow-500 data-[status='danger']:border-red-500"
    :data-focus="focus"
    :data-status="props.info?.status"
    :data-readonly="props.readonly"
    @click="onFocus"
  >
    <label
      class="data-[focus=true]:text-indigo-600 data-[empty=false]:mb-1 data-[empty=true]:text-sm text-xs text-zinc-500 transition-all data-[status='success']:text-indigo-500 data-[status='warn']:text-yellow-500 data-[status='danger']:text-red-500"
      :data-focus="focus"
      :data-empty="isEmpty && !focus"
      :data-status="props.info?.status"
      >{{ props.label }}</label
    >
    <input
      class="outline-none h-6 data-[empty=true]:h-0 transition-all data-[readonly=true]:bg-zinc-100"
      ref="inputREF"
      :type="props.type"
      :value="inputShow"
      :data-empty="isEmpty && !focus"
      :data-readonly="props.readonly"
      @focus="onFocus"
      @blur="onBlur"
      @input="inputHandler"
      @keydown="keydownHandler"
      :readonly="props.readonly"
    />
    <p
      class="text-xs mt-2 h-5 data-[status='']:h-0 data-[status='']:mt-0 data-[status='success']:text-indigo-500 data-[status='warn']:text-yellow-500 data-[status='danger']:text-red-500 transition-all"
      :data-status="props.info?.status ?? ''"
    >
      {{ props.info?.message ?? '' }}
    </p>
  </div>
</template>
