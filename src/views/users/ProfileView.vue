<script setup lang="ts">
import ProfileImg from '@/components/ui/ProfileImg.vue'
import { useAuthStore } from '@/stores/authStore'
import { useRoute } from 'vue-router'

const authStore = useAuthStore()
const route = useRoute()

const menuArr = [
  {
    label: '내 프로필',
    href: '/mypage/profile',
    name: 'profile',
  },
  {
    label: '내 여행계획',
    href: '/mypage/plans',
    name: 'myplans',
  },
  {
    label: '내가 쓴 글',
    href: '/mypage/posts',
    name: 'myPosts',
  },
  {
    label: '내가 쓴 댓글',
    href: '/mypage/comments',
    name: 'myComments',
  },
  {
    label: '내가 쓴 리뷰',
    href: '/mypage/reviews',
    name: 'myReviews',
  },
  {
    label: '좋아요 한 글',
    href: '/mypage/likePosts',
    name: 'myLikePosts',
  },
  // {
  //   label: '좋아요 한 관광지',
  //   href: '/mypage/likeAttractions',
  //   name: 'myLikeAttractions',
  // },
  {
    label: '좋아요 한 리뷰',
    href: '/mypage/likeReviews',
    name: 'myLikeReviews',
  },
]
</script>

<template>
  <main class="w-vw h-screen flex">
    <section class="shadow w-80 p-8 flex-col hidden md:flex">
      <div class="flex flex-col justify-start items-center p-5 border-b">
        <ProfileImg
          class="w-20 h-20"
          editable
          :src="authStore.user?.profileImage"
        />
        <h2 class="mt-2 text-xl font-semibold text-zinc-700">
          {{ authStore?.user?.nickname ?? 'nickname' }}
        </h2>
        <p class="text-sm text-zinc-400 font-light">
          {{ authStore?.user?.email ?? 'email' }}
        </p>
      </div>
      <ul class="flex flex-col flex-1 gap-2 pt-2 pb-2 overflow-y-auto">
        <RouterLink
          class="w-full shrink-0 h-10 text-zinc-600 text-left border-l-4 p-2 pl-3 pr-3 ellipsis text-sm select-none data-[route=true]:border-indigo-600 data-[route=true]:text-indigo-600 hover:border-indigo-600 hover:text-indigo-600 transition-colors"
          :data-route="route.path === e.href"
          :to="{ name: e.name }"
          v-for="e in menuArr"
        >
          {{ e.label }}
        </RouterLink>
      </ul>
    </section>
    <RouterView />
  </main>
</template>

<style scoped>
.shadow {
  box-shadow: 3px 0px 15px 3px rgba(0, 0, 0, 0.1);
}
</style>
