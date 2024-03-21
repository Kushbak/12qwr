import { createStore } from 'vuex'
import recipes from './recipes'
import modals from './modals'

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    recipes,
    modals,
  },
  strict: process.env.NODE_ENV !== 'production',
})
