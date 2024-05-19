<script setup lang="ts">
import { onBeforeMount } from 'vue'
import Header from './components/layout/Header.vue'
import UserNavigation from './components/layout/UserNavigation.vue'
import VarticalFrame from './components/layout/VarticalFrame.vue'
import FrameView from './views/frame/FrameView.vue'
import ModalAnchor from './components/modal/ModalAnchor.vue'
import Toast from './components/ui/Toast.vue'
import AttractionDnD from './components/plan/AttractionDnD.vue'

onBeforeMount(() => {
  const HOST = import.meta.env.VITE_KAKAO_APP_HOST
  const KEY = import.meta.env.VITE_KAKAO_APP_KEY
  const QUERY = '&autoload=false'

  const script = document.createElement('script')
  script.src = HOST + KEY + QUERY
  document.head.appendChild(script)
})
</script>

<template>
  <Header />
  <RouterView />
  <VarticalFrame>
    <FrameView />
  </VarticalFrame>
  <UserNavigation />
  <Toast />
  <ModalAnchor />
  <AttractionDnD />
</template>
