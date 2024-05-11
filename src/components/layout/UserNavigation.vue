<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const hover = ref(false)

const data = []

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
      <button
        class="absolute flex justify-center items-center w-10 h-10 rounded-full overflow-hidden bg-gray-800 border-gray-900 hover:bg-red-600 transition-all data-[hover=false]:opacity-0 data-[hover=true]:-translate-y-14"
        :data-hover="hover"
      >
        <FontAwesomeIcon icon="fa-solid fa-xmark" />
      </button>
      <RouterLink
        class="duration-300 hover:bg-indigo-500 hover:border-indigo-400 cursor-pointer flex justify-center border-2 border-indigo-500 items-center transition-all w-11 h-11 shrink-0 bg-indigo-600 rounded-full shadow-md data-[hover=true]:scale-125"
        :to="{ name: 'profile' }"
        :data-hover="hover"
      >
        <FontAwesomeIcon icon="fa-solid fa-user" />
      </RouterLink>
    </div>
  </div>
</template>
