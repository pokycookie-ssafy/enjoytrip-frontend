import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import SignupView from '@/views/SignupView.vue'
import BoardView from '@/views/BoardView.vue'
import MapView from '@/views/MapView.vue'
import ProfileView from '@/views/ProfileView.vue'
import FindUserView from '@/views/FindUserView.vue'
import FindUserEmailForm from '@/views/FindUserEmailForm.vue'
import FindUserPasswordForm from '@/views/FindUserPasswordForm.vue'
import BoardDetail from '@/components/ui/BoardDetail.vue'
import ReviewView from '@/views/ReviewView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView,
    },
    {
      path: '/board',
      name: 'board',
      component: BoardView,
      children: [
        {
          path: ':id',
          component: BoardDetail,
        },
      ],
    },
    {
      path: '/map',
      name: 'map',
      component: MapView,
    },
    {
      path: '/find',
      component: FindUserView,
      children: [
        {
          path: 'id',
          name: 'findEmail',
          component: FindUserEmailForm,
        },
        {
          path: 'password',
          name: 'findPassword',
          component: FindUserPasswordForm,
        },
      ],
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
    },
    {
      path: '/review',
      name: 'review',
      component: ReviewView,
    },
  ],
})

export default router
