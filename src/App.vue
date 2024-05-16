<script setup lang="ts">
import { onBeforeMount, onMounted } from 'vue'
import Header from './components/layout/Header.vue'
import UserNavigation from './components/layout/UserNavigation.vue'
import VarticalFrame from './components/layout/VarticalFrame.vue'
import FrameView from './views/FrameView.vue'
import ModalAnchor from './components/modal/ModalAnchor.vue'
import axios from 'axios'

onBeforeMount(() => {
  const HOST = import.meta.env.VITE_KAKAO_APP_HOST
  const KEY = import.meta.env.VITE_KAKAO_APP_KEY
  const QUERY = '&autoload=false'

  const script = document.createElement('script')
  script.src = HOST + KEY + QUERY
  document.head.appendChild(script)
})

onMounted(() => {
  // axios.defaults.baseURL = '/api'
  axios.defaults.headers.post['Content-Type'] = 'aplication/json'
})
</script>

<template>
  <Header />
  <RouterView />
  <VarticalFrame>
    <FrameView />
  </VarticalFrame>
  <UserNavigation />
  <ModalAnchor />
</template>
