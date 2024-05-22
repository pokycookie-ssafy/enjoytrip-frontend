<script setup lang="ts">
const props = defineProps<{
  message: string
}>()

const alert = () => {
  window.alert(props.message)
}
</script>

<template>
  <div class="flex flex-col items-center">
    <div
      class="w-52 h-12 p-3 bg-zinc-700 cursor-default rounded-lg transition-all shadow-md shadow-zinc-800"
    >
      {{ props.message }}
    </div>
    <div class="tri"></div>
  </div>
</template>

<style scoped>
.tri {
  width: 0;
  height: 0;
  border-top: 12px solid #3f3f46;
  border-bottom: 12px solid transparent;
  border-left: 17px solid transparent;
  border-right: 17px solid transparent;
}
</style>
