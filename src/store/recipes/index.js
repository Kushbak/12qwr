import { recipesApi } from '@/api'
import { formatFilters, getInitialFilters } from '@/utils'
import store from '..'
import { RECIPES_ACTIONS } from '../actions'

// todo too many actions and dispatches here
export default {
  state: {
    data: [],
    title: '',
    totalCount: 0,
    filters: getInitialFilters(),
    myBookmarks: [],
    myRecipes: [],
    userRecipes: {
      userData: null,
      recipes: null,
    },
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
    setUserRecipes(state, data) {
      state.userRecipes.recipes = data
    },
    setUserData(state, data) {
      state.userRecipes.userData = data
    },
    setRecipeDetails(state, recipe) {
      state.recipeDetails = recipe
    },
    addCommentToRecipeDetail(state, comment) {
      if (state.recipeDetails) {
        state.recipeDetails.comments.push(comment)
        state.recipeDetails.comments_count++
      }
    },
  },
  actions: {
    async [RECIPES_ACTIONS.GET_ALL_RECIPES]({ state, commit }) {
      const res = await recipesApi.getAllRecipes(formatFilters(state.filters))

      commit('setCategory', 0)
      commit('setRecipesData', res.data)
    },
    async [RECIPES_ACTIONS.SEARCH_RECIPES]({ commit }, search) {
      const res = await recipesApi.getAllRecipes({ search })

      commit('setSearch', search)
      commit('setRecipesData', res.data)
    },
    async [RECIPES_ACTIONS.GET_RECIPES_BY_CATEGORY]({ commit }, category) {
      const res = await recipesApi.getAllRecipes({
        category: category || null,
      })

      commit('setCategory', category)
      commit('setRecipesData', res.data)
    },
    async [RECIPES_ACTIONS.GET_ORDERED_RECIPES]({ state, commit }, ordering) {
      const res = await recipesApi.getAllRecipes({
        ...state.filters,
        category: state.filters.category === 0 ? null : state.filters.category,
        ordering,
      })

      commit('setOrdering', ordering)
      commit('setRecipesData', res.data)
    },
    async [RECIPES_ACTIONS.GET_MY_BOOKMARKS]({ commit }) {
      const res = await recipesApi.getMyBookmarks({ limit: 50 })

      commit('setMyBookmarks', res.data)
    },
    async [RECIPES_ACTIONS.GET_MY_RECIPES]({ commit, rootState }) {
      const res = await recipesApi.getRecipesByUserId(rootState.user.userData.id, { limit: 50 })

      commit('setMyRecipes', res.data)
    },
    async [RECIPES_ACTIONS.GET_RECIPES_BY_USER_ID]({ commit }, userId) {
      const res = await recipesApi.getRecipesByUserId(userId, { limit: 50 })

      commit('setUserRecipes', res.data)
    },
    async [RECIPES_ACTIONS.BOOKMARK_RECIPE](context, data) {
      const res = await recipesApi.addBookmark(data)
      console.log({ res })
    },
    async [RECIPES_ACTIONS.GET_RECIPE_BY_ID]({ commit }, recipeId) {
      const res = await recipesApi.getRecipeById(recipeId)

      commit('setRecipeDetails', res.data)
    },
    async [RECIPES_ACTIONS.ADD_COMMENT_TO_RECIPE]({ commit }, data) {
      const res = await recipesApi.addComment(data)
      commit('addCommentToRecipeDetail', res.data)
    },
    async [RECIPES_ACTIONS.RATE_RECIPE]({ dispatch, state }, data) {
      await recipesApi.addRate(data)
      dispatch(RECIPES_ACTIONS.GET_RECIPE_BY_ID, state.recipeDetails.id)
    },
  },
}
