import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/auths/LoginView.vue'
import SignupView from '@/views/auths/SignupView.vue'
import BoardView from '@/views/boards/BoardView.vue'
import MapView from '@/views/MapView.vue'
import ProfileView from '@/views/users/ProfileView.vue'
import FindUserView from '@/views/auths/FindUserView.vue'
import FindUserEmailForm from '@/views/auths/FindUserEmailForm.vue'
import FindUserPasswordForm from '@/views/auths/FindUserPasswordForm.vue'
import ReviewView from '@/views/reviews/ReviewView.vue'
import AttractionView from '@/views/attractions/AttractionView.vue'
import BoardDetailView from '@/views/boards/BoardDetailView.vue'
import BoardFormView from '@/views/boards/BoardFormView.vue'
import NewPlanView from '@/views/plans/NewPlanView.vue'

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
      path: '/boards',
      name: 'board',
      component: BoardView,
    },
    {
      path: '/boards/:id',
      component: BoardDetailView,
    },
    {
      path: '/boards/write',
      name: 'newBoard',
      component: BoardFormView,
    },
    {
      path: '/boards/write/:id',
      component: BoardFormView,
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
      path: '/reviews',
      name: 'review',
      component: ReviewView,
    },
    {
      path: '/attractions',
      name: 'attraction',
      component: AttractionView,
    },
    {
      path: '/plans/new',
      name: 'newPlan',
      component: NewPlanView,
    },
  ],
})

export default router
