import { getCookie } from '@/utils'
import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

instance.interceptors.request.use((config) => {
  const accessToken = getCookie(process.env.VUE_APP_CBAT)
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

// instance.interceptors.response.use(
//   (config) => config,
//   (error) => {
//     const originalRequest = error.config

//     if(error.response.status === 401) {

//     }
//   }
// )

export const recipesApi = {
  getMyBookmarks: async (params) => instance.get('recipe/bookmarks/', { params }),
  getAllCategories: async (params) => instance.get('recipe/categories/', { params }),
  getAllRecipes: async (params) => instance.get('recipe/feed/', { params }),
  getRecipesByUserId: async (userId, params) => instance.get(`recipe/user/${userId}/recipes/`, { params }),
  getRecipeById: async (recipeId) => instance.get(`recipe/${recipeId}/`),
  createRecipe: async (data) => instance.post('recipe/', data),
  addBookmark: async (data) => instance.post('recipe/bookmarks/', data),
  addComment: async (data) => instance.post('recipe/comments', data),
  addRate: async (data) => instance.post('recipe/rates', data),
  changeRecipe: async (recipeId, data) => instance.put(`recipe/${recipeId}/`, data),
  deleteRecipe: async (recipeId) => instance.delete(`recipe/${recipeId}`),
}

export const usersApi = {
  login: async (data) => instance.post('users/login/', data),
  register: async (data) => instance.post('users/register/', data),
  getProfile: async () => instance.get('users/profile/me/'),
}
