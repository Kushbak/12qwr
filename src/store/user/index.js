import { usersApi } from '@/api'

export default {
  state: {
    userData: null,
    errors: {},
    isLoading: false,
  },
  getters: {},
  mutations: {
    setUserData(state, userData) {
      state.userData = userData
    },
    logout(state) {
      state.userData = null
      localStorage.removeItem('token')
    },
    setErrors(state, errors) {
      state.errors = errors
    },
    setLoading(state, loading) {
      state.isLoading = loading
    },
  },
  actions: {
    async login({ commit }, userData) {
      commit('setLoading', true)
      commit('setErrors', {})
      try {
        const res = await usersApi.login(userData)
        console.log({ res })
        // localStorage.setItem('token', JSON.stringify(res.data))
      } catch (e) {
        commit('setErrors', e.response.data.errors || e.response.data)
        return Promise.reject(e)
      } finally {
        commit('setLoading', false)
      }
    },
    async register({ commit }, userData) {
      commit('setLoading', true)
      commit('setErrors', {})
      try {
        const res = await usersApi.register(userData)
        console.log({ res })
        // localStorage.setItem('token', JSON.stringify(res.data))
      } catch (e) {
        commit('setErrors', e.response.data.errors || e.response.data)
        return Promise.reject(e)
      } finally {
        commit('setLoading', false)
      }
    },
  },
}
