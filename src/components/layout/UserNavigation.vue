<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import Caption from '../ui/Caption.vue'
import { useToastStore } from '@/stores/toast'
import { makeID } from '@/utils/key'

const hover = ref(false)

const { addToast } = useToastStore()

const mouseoverHandler = () => {
  hover.value = true
}

const mouseoutHandler = () => {
  hover.value = false
}
</script>

<template>
  <div
    class="fixed right-5 bottom-5 flex justify-end items-end text-sm text-white z-[998] data-[hover=true]:h-28"
    @mouseover="mouseoverHandler"
    @mouseout="mouseoutHandler"
    :data-hover="hover"
  >
    <div class="flex justify-center items-center">
      <div
        class="absolute flex items-center group/logout transition-all data-[hover=false]:opacity-0 data-[hover=true]:-translate-y-14"
        :data-hover="hover"
      >
        <button
          class="flex justify-center items-center w-10 h-10 rounded-full overflow-hidden bg-gray-800 border-gray-900 hover:bg-red-600"
          @click="addToast(makeID(32), 'danger')"
        >
          <FontAwesomeIcon icon="fa-solid fa-xmark" />
        </button>
        <Caption
          text="로그아웃"
          class="-left-20 group-hover/logout:opacity-100 opacity-0 transition-all"
        />
      </div>
      <div class="flex items-center justify-center group/profile relative">
        <RouterLink
          class="duration-300 hover:bg-indigo-500 hover:border-indigo-400 cursor-pointer flex justify-center border-2 border-indigo-500 items-center transition-all w-11 h-11 shrink-0 bg-indigo-600 rounded-full shadow-md data-[hover=true]:scale-125"
          :to="{ name: 'profile' }"
          :data-hover="hover"
        >
          <FontAwesomeIcon icon="fa-solid fa-user" />
        </RouterLink>
        <Caption
          text="프로필 보기"
          class="-left-24 group-hover/profile:opacity-100 opacity-0 transition-all"
        />
      </div>
    </div>
  </div>
</template>
