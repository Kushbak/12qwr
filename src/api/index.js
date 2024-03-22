import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const recipesApi = {
  getAllRecipes: (data) => instance.get('recipe/feed/', { params: data }),
}

export const usersApi = {
  login: async (data) => {
    const res = instance.post('users/login/', data)
    return res.data
  },
  register: (data) => {
    const res = instance.post('users/register/', data)
    return res.data
  },
}
