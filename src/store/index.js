import { createStore } from 'vuex'
import recipes from './recipes'
import modals from './modals'
import user from './user'

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    recipes,
    modals,
    user,
  },
  strict: process.env.NODE_ENV !== 'production',
})
