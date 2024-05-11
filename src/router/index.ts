import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import SignupView from '@/views/SignupView.vue'
import BoardView from '@/views/BoardView.vue'
import MapView from '@/views/MapView.vue'
import FindUser from '@/views/FindUser.vue'
import FindUserEmail from '@/views/FindUserEmail.vue'
import FindUserPassword from '@/views/FindUserPassword.vue'

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
    },
    {
      path: '/map',
      name: 'map',
      component: MapView,
    },
    {
      path: '/find',
      component: FindUser,
      children: [
        {
          path: 'id',
          name: 'findEmail',
          component: FindUserEmail,
        },
        {
          path: 'password',
          name: 'findPassword',
          component: FindUserPassword,
        },
      ],
    },
  ],
})

export default router
