import { createStore } from 'vuex'
import recipes from './recipes'

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    recipes,
  },
  strict: process.env.NODE_ENV !== 'production',
})
