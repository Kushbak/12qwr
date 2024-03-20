import { recipesApi } from '@/api'
import { CATEGORIES, getInitialFilters } from '@/utils/const'

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
      state.title = CATEGORIES[state.filters.category] || 'Прочее'
      state.totalCount = newRecipesData.total_count
    },
    setOrdering(state, newOrdering) {
      state.filters.ordering = newOrdering
    },
    setSearch(state, newSearch) {
      state.filters.search = newSearch
    },
    setCategory(state, newCategory) {
      state.filters.category = newCategory
    },
    resetFilters(state) {
      state.filters = getInitialFilters()
    },
  },
  actions: {
    async getAllRecipes({ commit }) {
      const data = await recipesApi.getAllRecipes()

      commit('setRecipesData', data)
    },
    // finish filter formatting and test all cases of getting recipes on main page
    async searchRecipes() {
      await recipesApi.getAllRecipes()
    },
  },
  modules: {},
}
