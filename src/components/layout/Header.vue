<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const hover = ref(false)

interface IHeaderLink {
  label: string
  name: string
}

const links: IHeaderLink[] = [
  { label: '홈', name: 'home' },
  { label: '자유게시판', name: 'board' },
  { label: '지도', name: 'map' },
  { label: '리뷰', name: 'review' },
  { label: '관광지', name: 'attraction' },
]

const mouseoverHandler = () => {
  hover.value = true
}

const mouseoutHandler = () => {
  hover.value = false
}
</script>

<template>
  <header
    class="w-vw p-4 flex justify-center items-center fixed left-0 top-0 z-[999] select-none"
    :onMouseover="mouseoverHandler"
    :onMouseout="mouseoutHandler"
  >
    <section
      class="w-fit max-w-[500px] data-[hover=false]:-translate-y-20 data-[hover=false]:opacity-0 duration-300 transition-all h-16 rounded-md bg-gray-800 p-3 flex justify-between bg-opacity-80 text-white backdrop-blur-sm shadow-md"
      :data-hover="hover"
    >
      <div class="flex gap-2 h-full">
        <RouterLink
          class="h-full p-2 pl-3 pr-3 flex justify-center items-center transition-colors rounded hover:bg-gray-900 hover:bg-opacity-50"
          v-for="(e, i) in links"
          :key="i"
          :to="{ name: e.name }"
        >
          {{ e.label }}
        </RouterLink>
      </div>
    </section>
  </header>
</template>
