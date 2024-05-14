<script setup lang="ts">
const props = defineProps<{
  imgSrc: string[]
}>()
</script>

<template>
  <section class="flex h-72 flex-wrap gap-1" v-if="props.imgSrc.length < 3">
    <div
      class="flex-1 min-w-[48%] h-full rounded overflow-hidden"
      v-for="(src, i) in props.imgSrc"
    >
      <img class="w-full h-full rounded object-cover" :key="i" :src="src" />
    </div>
  </section>

  <section class="flex h-72 gap-1" v-if="props.imgSrc.length == 3">
    <div class="flex-1 h-full rounded overflow-hidden">
      <img class="w-full h-full rounded object-cover" :src="props.imgSrc[0]" />
    </div>
    <div class="flex flex-col flex-1 gap-1">
      <div class="flex-1 w-full rounded overflow-hidden">
        <img
          class="w-full h-full rounded object-cover"
          :src="props.imgSrc[1]"
        />
      </div>
      <div class="flex-1 w-full rounded overflow-hidden">
        <img
          class="w-full h-full rounded object-cover"
          :src="props.imgSrc[2]"
        />
      </div>
    </div>
  </section>

  <section class="flex h-72 gap-1" v-if="props.imgSrc.length > 3">
    <div class="flex flex-col flex-1 gap-1">
      <div class="flex-1 w-full rounded overflow-hidden">
        <img
          class="w-full h-full rounded object-cover"
          :src="props.imgSrc[0]"
        />
      </div>
      <div class="flex-1 w-full rounded overflow-hidden">
        <img
          class="w-full h-full rounded object-cover"
          :src="props.imgSrc[1]"
        />
      </div>
    </div>
    <div class="flex flex-col flex-1 gap-1">
      <div class="flex-1 w-full rounded overflow-hidden">
        <img
          class="w-full h-full rounded object-cover"
          :src="props.imgSrc[2]"
        />
      </div>
      <div class="flex-1 w-full rounded overflow-hidden">
        <img
          class="w-full h-full rounded object-cover"
          :src="props.imgSrc[3]"
        />
      </div>
    </div>
  </section>
</template>
