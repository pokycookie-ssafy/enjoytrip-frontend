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
      class="w-64 h-28 p-3 bg-zinc-700 cursor-default rounded-lg transition-all shadow-md shadow-zinc-800"
    >
      <button
        class="w-full h-8 rounded bg-indigo-600 text-sm text-white hover:bg-indigo-500"
        onclick="console.log('eee')"
      >
        {{ props.message }}
      </button>
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
