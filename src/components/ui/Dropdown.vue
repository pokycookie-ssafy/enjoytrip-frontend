<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { onUnmounted, ref, watch, type Ref } from 'vue'

const props = defineProps<{
  placeholder?: string
  autoClose?: boolean
}>()

const emits = defineEmits<{
  (e: 'onChange', value: string): void
}>()

const isOpen = ref(false)

const dropdownREF = ref<HTMLDivElement | null>(null)
const indicatorREF = ref<HTMLDivElement | null>(null)
const optionContainerREF = ref<HTMLDivElement | null>(null)

const containREF = (ref: Ref, target: EventTarget | null) => {
  return ref.value && (ref.value as HTMLElement).contains(target as HTMLElement)
}

const clickHandler = (e: MouseEvent) => {
  if (!isOpen.value && containREF(indicatorREF, e.target)) {
    isOpen.value = true
  } else if (isOpen.value && containREF(indicatorREF, e.target)) {
    isOpen.value = false
  } else if (props.autoClose && containREF(optionContainerREF, e.target)) {
    isOpen.value = false
  } else if (!containREF(dropdownREF, e.target)) {
    isOpen.value = false
  }
}

watch(
  isOpen,
  () => {
    document.addEventListener('click', clickHandler)
  },
  { immediate: true }
)

onUnmounted(() => {
  document.removeEventListener('click', clickHandler)
})
</script>

<template>
  <div class="relative" ref="dropdownREF">
    <div
      class="h-10 border rounded data-[open=true]:border-indigo-600 divide-x flex justify-between items-center overflow-hidden cursor-pointer"
      ref="indicatorREF"
      :data-open="isOpen"
    >
      <p
        class="h-full select-none flex items-center p-2 text-sm overflow-hidden text-ellipsis whitespace-nowrap flex-1 text-zinc-600"
      >
        {{ props.placeholder ?? '' }}
      </p>
      <button
        class="w-10 flex justify-center items-center bg-zinc-100 h-full outline-none"
      >
        <FontAwesomeIcon
          icon="fa-solid fa-chevron-down"
          class="text-sm text-zinc-400 data-[open=true]:rotate-180 transition-transform"
          :data-open="isOpen"
        />
      </button>
    </div>
    <div
      :class="`w-full border flex flex-col max-h-56 z-[999] overflow-y-auto absolute bg-white top-12 rounded transition-all data-[open=false]:opacity-0 data-[open=false]:pointer-events-none data-[open=false]:scale-75`"
      ref="optionContainerREF"
      :data-open="isOpen"
    >
      <slot />
    </div>
  </div>
</template>
