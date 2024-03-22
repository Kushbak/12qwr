import { usersApi } from '@/api'

export default {
  state: {
    userData: null,
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
  },
  actions: {
    async login(store, userData) {
      const data = usersApi.login(userData)
      localStorage.setItem('token', JSON.stringify(data))
    },
  },
}
