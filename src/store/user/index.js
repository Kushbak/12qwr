import { usersApi } from '@/api'
import { getCookie, jwtDecode, removeCookie, saveTokens } from '@/utils'
import { USER_ACTIONS } from '../actions'

export default {
  state: {
    profile: null,
    errors: {},
    isLoading: false,
  },
  getters: {},
  mutations: {
    setUserData(state, userData) {
      state.profile = userData
    },
    logout(state) {
      state.profile = null
      removeCookie(process.env.VUE_APP_CBAT)
      removeCookie(process.env.VUE_APP_CBRT)
    },
    setErrors(state, errors) {
      state.errors = errors
    },
    setLoading(state, loading) {
      state.isLoading = loading
    },
  },
  actions: {
    async [USER_ACTIONS.GET_USER_BY_ID]({ commit }, userId) {
      try {
        const res = await usersApi.getUserById(userId)
        commit('setUserData', res.data)
      } catch (e) {
        console.log(e)
      }
    },
    async [USER_ACTIONS.GET_PROFILE]({ commit }) {
      try {
        const cookie = getCookie(process.env.VUE_APP_CBAT)
        const decoded = jwtDecode(cookie)
        if (decoded) {
          const res = await usersApi.getUserById(decoded.user_id)
          commit('setUserData', res.data)
        }
      } catch (e) {
        console.log(e)
      }
    },
    async login({ commit, dispatch }, userData) {
      commit('setLoading', true)
      commit('setErrors', {})
      try {
        const res = await usersApi.login(userData)
        saveTokens(res.data)
        dispatch(USER_ACTIONS.GET_PROFILE)
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
        // localStorage.setItem('token', JSON.stringify(res.data))
        console.log({ res })
      } catch (e) {
        commit('setErrors', e.response.data.errors || e.response.data)
        return Promise.reject(e)
      } finally {
        commit('setLoading', false)
      }
    },
  },
}
