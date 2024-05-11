<script setup lang="ts">
import bg from '@/assets/img/blue.jpg'
import Typewriter from '@/components/ui/Typewriter.vue'
import axios from 'axios'
import { onMounted, ref } from 'vue'

const areaArr = ref<string[]>([])

interface IArea {
  code: string
  name: string
  details: {
    code: string
    name: string
  }[]
}

function shuffle(array: string[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

onMounted(async () => {
  const { data } = await axios.get<IArea[]>('/areaCode.json')
  const res: string[] = []
  data.forEach((area) => {
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
      class="text-white font-semibold text-6xl flex flex-col gap-6 absolute left-20 bottom-20"
    >
      <h2>Enjoy your trip!</h2>
      <h2>
        <Typewriter
          :text="areaArr"
          :speed="100"
          :delay="100"
          :duration="3000"
        />로 떠나요!
      </h2>
    </span>

    <img
      :src="bg"
      class="object-cover absolute left-0 top-0 -z-10 w-full h-full"
    />
  </section>
</template>
