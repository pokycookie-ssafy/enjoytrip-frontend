<script setup lang="ts">
import ProfileImg from '@/components/ui/ProfileImg.vue'
import StarRating from '@/components/ui/StarRating.vue'
import { QuillEditor } from '@vueup/vue-quill'
import dayjs from 'dayjs'

const props = defineProps<{
  reviewId: number
  writer: string
  writerImage: string | null
  time: Date
  content: string
  point: number
}>()
</script>

<template>
  <RouterLink
    class="flex flex-col gap-4 border bg-zinc-100 rounded p-3 hover:bg-zinc-200 hover:border-zinc-300 transition-colors"
    :to="`reviews?id=${props.reviewId}`"
  >
    <div class="flex justify-between items-start w-full">
      <div class="flex items-center gap-2">
        <ProfileImg class="w-10 h-10" :src="props.writerImage" />
        <span>
          <h2 class="text-zinc-700">{{ props.writer }}</h2>
          <p class="text-xs text-zinc-400 font-light">
            {{ dayjs(props.time).format('YYYY.MM.DD') }}
          </p>
        </span>
      </div>
      <StarRating class="w-24" :value="props.point" readonly />
    </div>

    <section class="no-border small">
      <QuillEditor
        theme="snow"
        readOnly
        :content="props.content"
        contentType="html"
        :options="{ modules: { toolbar: false } }"
      />
    </section>
  </RouterLink>
</template>
