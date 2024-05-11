<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
</script>

<template>
  <footer
    class="w-vw h-96 bg-gray-900 text-sm text-gray-400 flex flex-col justify-between p-12"
  >
    <div class="w-full flex-1 flex justify-center gap-12 text-2xl">
      <button class="hover:text-zinc-200">
        <FontAwesomeIcon icon="fa-brands fa-facebook"></FontAwesomeIcon>
      </button>
      <button class="hover:text-zinc-200">
        <FontAwesomeIcon icon="fa-brands fa-instagram"></FontAwesomeIcon>
      </button>
      <button class="hover:text-zinc-200">
        <FontAwesomeIcon icon="fa-brands fa-x-twitter"></FontAwesomeIcon>
      </button>
      <button class="hover:text-zinc-200">
        <FontAwesomeIcon icon="fa-brands fa-github"></FontAwesomeIcon>
      </button>
      <button class="hover:text-zinc-200">
        <FontAwesomeIcon icon="fa-brands fa-gitlab"></FontAwesomeIcon>
      </button>
      <button class="hover:text-zinc-200">
        <FontAwesomeIcon icon="fa-brands fa-youtube"></FontAwesomeIcon>
      </button>
    </div>
    <div class="w-full flex justify-center pt-8 border-t border-gray-700">
      <p>&copy; SSAFY 11, Co. All rights reserved</p>
    </div>
  </footer>
</template>
