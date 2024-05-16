<script setup lang="ts">
import ProfileImg from '@/components/ui/ProfileImg.vue'
import StarRating from '@/components/ui/StarRating.vue'
</script>

<template>
  <RouterLink
    class="flex flex-col gap-4 border bg-zinc-100 rounded p-3 hover:bg-zinc-200 hover:border-zinc-300 transition-colors"
    :to="'#'"
  >
    <div class="flex justify-between items-start w-full">
      <div class="flex items-center gap-2">
        <ProfileImg class="w-10 h-10" />
        <span>
          <h2 class="text-zinc-700">user1</h2>
          <p class="text-xs text-zinc-400 font-light">2020.08.20</p>
        </span>
      </div>
      <StarRating class="w-24" :value="7" readonly />
    </div>
    <p>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book. It has survived not only five centuries, but
      also the leap into electronic typesetting, remaining essentially
      unchanged. It was popularised in the 1960s with the release of Letraset
      sheets containing Lorem Ipsum passages, and more recently with desktop
      publishing software like Aldus PageMaker including versions of Lorem
      Ipsum.
    </p>
    <!-- <div class="flex justify-between items-center gap-2">
      <h3 class="text-zinc-600 font-semibold text-base flex-1 ellipsis">
        {{ props.attraction?.title }}
      </h3>
      <StarRating class="w-24" :value="7" readonly />
    </div>
    <div class="flex justify-between gap-2 items-center">
      <p class="ellipsis flex-1 text-xs">{{ props.attraction?.addr1 ?? '' }}</p>
    </div> -->
  </RouterLink>
</template>
