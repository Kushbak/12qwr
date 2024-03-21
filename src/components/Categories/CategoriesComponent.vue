<script setup>
  import store from '@/store'
  import { RECIPES_ACTIONS } from '@/store/actions'
  import ButtonComponent from '@/ui/Button/ButtonComponent'
  import { CATEGORIES } from '@/utils/const'
  import { computed, onMounted, onUnmounted, ref } from 'vue'

  const activeCategory = computed(() => store.state.recipes.filters.category)
  const categories = ref([])
  const hiddenCategories = ref([])
  const isMoreCategoriesShown = ref(false)

  const onMoreCategoriesClick = () => {
    isMoreCategoriesShown.value = !isMoreCategoriesShown.value
    console.log(0, isMoreCategoriesShown.value)
  }

  const hideMoreCategories = () => {
    if (isMoreCategoriesShown.value) {
      isMoreCategoriesShown.value = false
      console.log(1, isMoreCategoriesShown.value)
    }
  }

  const onCategoryClick = (category) => {
    if (category === 0) {
      store.dispatch(RECIPES_ACTIONS.GET_ALL_RECIPES)
      return
    }
    store.dispatch(RECIPES_ACTIONS.GET_RECIPES_BY_CATEGORY, category)
  }

  const sliceCategories = () => {
    const ELEMENT_WIDTH = 150
    categories.value = []
    hiddenCategories.value = []
    for (let i = 0; i < CATEGORIES.length; i++) {
      if (i < Math.floor(window.document.body.clientWidth / ELEMENT_WIDTH)) {
        categories.value.push(CATEGORIES[i])
      } else {
        hiddenCategories.value.push(CATEGORIES[i])
      }
    }
  }

  onMounted(() => {
    sliceCategories()
    window.addEventListener('resize', sliceCategories)
  })
  onUnmounted(() => {
    window.removeEventListener('resize', sliceCategories)
  })
</script>

<template>
  <div class="categories">
    <ButtonComponent
      type="lucid"
      v-for="(category, index) of categories"
      :key="category"
      :class="[
        'categories__item',
        CATEGORIES[activeCategory] === category && 'categories__item_active',
      ]"
      :onClick="() => onCategoryClick(index)"
    >
      {{ category }}
    </ButtonComponent>
    <ButtonComponent
      class="categories__item"
      type="lucid"
      :onClick="onMoreCategoriesClick"
    >
      Еще
    </ButtonComponent>
    <div class="categories__dropdown" v-if="isMoreCategoriesShown">
      <button
        v-for="category of hiddenCategories"
        :key="category"
        class="categories__dropdownItem"
        v-click-outside="hideMoreCategories"
        @click="() => onCategoryClick(categories.length + index - 1)"
      >
        {{ category }}
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .categories {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 0;
    margin-bottom: 32px;
    &__item {
      font-size: 14px;
      padding: 4px;
      &_active {
        font-weight: bold;
      }
    }
    &__dropdown {
      position: absolute;
      right: 0;
    }
  }
</style>
