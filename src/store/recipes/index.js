import { recipesApi } from '@/api'
import { formatFilters, getInitialFilters } from '@/utils'
import store from '..'

export default {
  state: {
    data: [],
    title: '',
    totalCount: 0,
    filters: getInitialFilters(),
    myBookmarks: [],
    myRecipes: [],
    userRecipes: [],
    recipeDetails: null,
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
      const categories = store.state.categories
      state.data = newRecipesData.list
      state.title = state.filters.category ? categories[state.filters.category].name || 'Прочее' : categories[0].name
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
    setMyBookmarks(state, recipes) {
      state.myBookmarks = recipes
    },
    setMyRecipes(state, recipes) {
      state.myRecipes = recipes
    },
    setUserRecipes(state, recipes) {
      state.userRecipes = recipes
    },
    setRecipeDetails(state, recipe) {
      state.recipeDetails = recipe
    },
  },
  actions: {
    async getAllRecipes({ state, commit }) {
      const res = await recipesApi.getAllRecipes(formatFilters(state.filters))

      commit('setCategory', 0)
      commit('setRecipesData', res.data)
    },
    async searchRecipes({ commit }, search) {
      const res = await recipesApi.getAllRecipes({ search })

      commit('setSearch', search)
      commit('setRecipesData', res.data)
    },
    async getRecipesByCategory({ commit }, category) {
      const res = await recipesApi.getAllRecipes({
        category: category || null,
      })

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
    async getMyBookmarks({ commit }) {
      const res = await recipesApi.getMyBookmarks({ limit: 50 })

      commit('setMyBookmarks', res.data)
    },
    async getMyRecipes({ commit, rootState }) {
      const res = await recipesApi.getRecipesByUserId(rootState.user.userData.id, { limit: 50 })

      commit('setMyRecipes', res.data)
    },
    async getRecipesByUserId({ commit }, userId) {
      const res = await recipesApi.getRecipesByUserId(userId, { limit: 50 })

      commit('setUserRecipes', res.data)
    },
    async bookmarkRecipe(context, data) {
      const res = await recipesApi.addBookmark(data)
      console.log({ res })
    },
    async getRecipeById({ commit }, recipeId) {
      const res = await recipesApi.getRecipeById(recipeId)

      commit('setRecipeDetails', res.data)
    },
  },
}
