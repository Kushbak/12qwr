export default {
  state: {
    currentModal: null,
    props: {},
    toaster: null,
  },
  getters: {},
  mutations: {
    openModal(state, newModal) {
      state.currentModal = newModal.modalName
      state.props = newModal.props || {}
    },
    closeModal(state) {
      state.currentModal = null
      state.props = {}
    },
    setToast(state, text) {
      state.toaster = text
    },
  },
  actions: {
    toast({ commit }, text) {
      commit('setToast', text)
      setTimeout(() => {
        commit('setToast', null)
      }, 3000)
    },
  },
}
