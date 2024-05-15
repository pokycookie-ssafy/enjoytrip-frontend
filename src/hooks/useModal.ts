import Modal from '@/components/modal/Modal.vue'
import { h, ref, watch, type VNode } from 'vue'

interface IModalOptions {
  autoClose?: boolean
  className?: string
}

export default function useModal(options?: IModalOptions) {
  const isOpen = ref(false)
  const content = ref<VNode | null>(null)

  const openModal = () => (isOpen.value = true)
  const closeModal = () => (isOpen.value = false)

  const modal = ref<VNode | null>(
    isOpen
      ? h(
          Modal,
          {
            autoClose: options?.autoClose ? closeModal : undefined,
            className: options?.className,
          },
          content.value ?? undefined
        )
      : null
  )

  watch(content, (curr) => {
    modal.value = isOpen
      ? h(
          Modal,
          {
            autoClose: options?.autoClose ? closeModal : undefined,
            className: options?.className,
          },
          content.value ?? undefined
        )
      : null
  })

  watch(
    [content],
    ([content]) => {
      console.log(modal.value)
    },
    { immediate: true }
  )

  return { openModal, closeModal, modal, isOpen, content }
}
