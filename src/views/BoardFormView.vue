<script setup lang="ts">
import { QuillEditor } from '@vueup/vue-quill'
</script>

<template>
  <main class="w-vw p-24 flex justify-center">
    <section class="flex flex-col w-full max-w-[800px] p-4">
      <input
        class="border text-sm w-full h-10 border-gray-300 outline-none p-3 pr-4 pl-4 rounded mb-3 focus:border-indigo-600"
        placeholder="제목을 입력하세요"
      />
      <QuillEditor />
    </section>
  </main>
</template>
