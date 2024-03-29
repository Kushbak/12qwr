import { getCookie } from '@/utils'
import MainViewVue from '@/views/MainView.vue'
import ProfileView from '@/views/ProfileView.vue'
import RecipeDetailView from '@/views/RecipeDetailView.vue'
import RecipeForm from '@/views/RecipeForm.vue'
import UserProfileView from '@/views/UserProfileView.vue'
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
    path: '/recipeForm',
    name: 'Create Recipe',
    component: RecipeForm,
    meta: {
      auth: true,
    },
  },
  {
    path: '/recipe/:id',
    name: 'Recipe Details',
    component: RecipeDetailView,
  },
  {
    path: '/users/:id',
    name: 'User Details',
    component: UserProfileView,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.meta.auth && !getCookie(process.env.VUE_APP_CBAT)) {
    next('/')
    return
  }
  next()
})

export default router
