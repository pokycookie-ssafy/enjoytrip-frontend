<script setup lang="ts">
import Button from './Button.vue'
import CheckBox from './CheckBox.vue'
import Input from './Input.vue'
</script>

<template>
  <nav
    class="w-52 h-96 p-4 border rounded shadow-lg sticky top-24 flex flex-col gap-2"
  >
    <div class="flex flex-col gap-2 pb-2 border-b">
      <Input label="검색어" />
      <Button>검색</Button>
    </div>
    <div>
      <div class="flex justify-start items-center gap-1 text-sm">
        <CheckBox :value="false" />
        <p>공지</p>
      </div>
    </div>
  </nav>
</template>
