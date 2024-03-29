<script setup>
  import { defineProps } from 'vue'
  import { withAuth } from '@/utils/hofs'
  import { RECIPES_ACTIONS } from '@/utils/const'
  import store from '@/store'
  import ButtonComponent from '@/ui/Button/ButtonComponent.vue'
  import { bookmark } from '@/assets/img'

  const props = defineProps(['recipe'])

  const handleSaveClick = withAuth(async () => {
    // todo add reactive changing of layout for bookmarks
    await store.dispatch(RECIPES_ACTIONS.BOOKMARK_RECIPE, {
      recipe: props.value.recipe.value.id,
      is_bookmarked: !props.value.recipe.value.is_bookmarked,
    })
  })
</script>

<template>
  <ButtonComponent btnType="lucid" class="bookmarkBtn" @click="handleSaveClick">
    <img :src="bookmark" />
    {{ props.recipe.is_bookmarked ? 'Сохранено' : 'Сохранить рецепт' }}
  </ButtonComponent>
</template>

<style lang="scss" scoped>
  .bookmarkBtn {
    border: 1px solid var(--color-dark);
    img {
      margin-right: 10px;
    }
  }
</style>
