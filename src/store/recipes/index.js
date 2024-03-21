import { recipesApi } from '@/api'
import { getInitialFilters } from '@/utils'
import { CATEGORIES } from '@/utils/const'

export default {
  state: {
    data: [],
    title: '',
    totalCount: 0,
    filters: getInitialFilters(),
  },
  getters: {
    paginationData(state) {
      return {
        totalCount: state.totalCount,
        currentPage: state.filters.page,
        totalPages: Math.ceil(state.totalCount / state.filters.limit),
      }
    },
    isSearch(state) {
      return !!state.filters.search
    },
  },
  mutations: {
    setRecipesData(state, newRecipesData) {
      state.data = newRecipesData.list
      state.title = state.filters.category
        ? CATEGORIES[state.filters.category] || 'Прочее'
        : CATEGORIES[0]
      state.totalCount = newRecipesData.total_count
    },
    setOrdering(state, newOrdering) {
      state.filters.ordering = newOrdering
    },
    setSearch(state, newSearch) {
      if (newSearch === '') {
        state.filters.category = 0
        state.filters.search = null
      } else {
        state.filters.category = null
        state.filters.search = newSearch
      }
    },
    setCategory(state, newCategory) {
      state.filters.search = null
      state.filters.category = newCategory
    },
    resetFilters(state) {
      state.filters = getInitialFilters()
    },
  },
  actions: {
    async getAllRecipes({ state, commit }) {
      const res = await recipesApi.getAllRecipes({ ...state.filters })

      commit('setCategory', 0)
      commit('setRecipesData', res.data)
    },
    async searchRecipes({ commit }, search) {
      const res = await recipesApi.getAllRecipes({ search })

      commit('setSearch', search)
      commit('setRecipesData', res.data)
    },
    async getRecipesByCategory({ commit }, category) {
      const res = await recipesApi.getAllRecipes({ category })

      commit('setCategory', category)
      commit('setRecipesData', res.data)
    },
    async getOrderedRecipes({ state, commit }, ordering) {
      const res = await recipesApi.getAllRecipes({
        ...state.filters,
        category: state.filters.category === 0 ? null : state.filters.category,
        ordering,
      })

      commit('setOrdering', ordering)
      commit('setRecipesData', res.data)
    },
  },
  modules: {},
}
