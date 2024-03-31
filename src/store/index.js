import { createStore } from 'vuex'
import recipes from './recipes'
import modals from './modals'
import user from './user'
import { recipesApi } from '@/api'

export default createStore({
  state: {
    categories: [],
  },
  getters: {
    getCategories(state) {
      return state.categories
    },
  },
  mutations: {
    setCategories(state, newCategories) {
      state.categories = newCategories
    },
  },
  actions: {
    async getAllCategories({ commit }) {
      const res = await recipesApi.getAllCategories({ limit: 50 })
      commit('setCategories', res.data.list)
    },
  },
  modules: {
    recipes,
    modals,
    user,
  },
  strict: process.env.NODE_ENV !== 'production',
})
