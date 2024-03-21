export default {
  state: {
    currentModal: null,
    props: {},
  },
  getters: {},
  mutations: {
    openModal(state, newModal) {
      state.currentModal = newModal.modalName
      state.props = newModal.props
    },
    closeModal(state) {
      state.currentModal = null
      state.props = {}
    },
  },
}
