import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const recipesApi = {
  getAllRecipes: async (data) => instance.get('recipe/feed/', { params: data }),
}

export const usersApi = {
  login: async (data) => instance.post('users/login/', data),
  register: async (data) => instance.post('users/register/', data),
}
