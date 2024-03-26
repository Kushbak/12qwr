import store from '@/store'
import { MODAL_KEYS } from './const'

export const withAuth =
  (cb) =>
  (...args) => {
    if (!store.state.user.userData) {
      store.commit('openModal', { modalName: MODAL_KEYS.LOGIN })
      return
    }
    cb(...args)
  }
