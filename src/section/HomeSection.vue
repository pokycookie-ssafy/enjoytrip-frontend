<script setup lang="ts">
import areaCode from '@/assets/data/areaCode'
import bg from '@/assets/img/blue.jpg'
import Typewriter from '@/components/ui/Typewriter.vue'
import { onMounted, ref } from 'vue'

const areaArr = ref<string[]>([])

function shuffle(array: string[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

onMounted(() => {
  const res: string[] = []
  areaCode.forEach((area) => {
    area.details.forEach((detail) => {
      res.push(`${area.name} ${detail.name}`)
    })
  })
  shuffle(res)
  areaArr.value = res
})
</script>

<template>
  <section class="w-full h-screen relative">
    <span
      class="title text-white font-semibold flex flex-col absolute select-none"
    >
      <h2>나는 지금,</h2>
      <h2>
        <Typewriter
          :text="areaArr"
          :speed="100"
          :delay="100"
          :duration="3000"
        />에 가고 싶다!
      </h2>
    </span>

    <img
      :src="bg"
      class="object-cover absolute left-0 top-0 -z-10 w-full h-full select-none"
    />
  </section>
</template>

<style scoped>
.title {
  font-size: min(6vw, 6rem);
  left: min(6vw, 5rem);
  bottom: min(6vw, 5rem);
}
</style>
