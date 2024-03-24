import MainViewVue from '@/views/MainView.vue'
import ProfileView from '@/views/ProfileView.vue'
import RecipeDetailView from '@/views/RecipeDetailView.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Main',
    component: MainViewVue,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileView,
    meta: {
      auth: true,
    },
  },
  {
    path: '/recipe/:id',
    name: 'Recipe Details',
    component: RecipeDetailView,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
