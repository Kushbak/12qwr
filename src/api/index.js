import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const recipesApi = {
  getAllRecipes: () => instance.get('recipe/feed/'),
}
