<script setup>
  import { defineProps, ref } from 'vue'
  import store from '@/store'
  import { withAuth } from '@/utils/hofs'
  import { formatCommentDate } from '@/utils'
  import { RECIPES_ACTIONS } from '@/store/actions'
  import ButtonComponent from '@/ui/Button/ButtonComponent'
  import InputComponent from '@/ui/Input/InputComponent'
  import AvatarComponent from '@/ui/Avatar/AvatarComponent'

  const props = defineProps(['comments', 'recipeId'])

  const commentInput = ref('')

  const addComment = withAuth(async () => {
    await store.dispatch(RECIPES_ACTIONS.ADD_COMMENT_TO_RECIPE, {
      text: commentInput.value,
      recipe: props.recipeId,
    })
    commentInput.value = ''
  })
</script>

<template>
  <template v-for="commentData of props.comments" :key="commentData.id">
    <div class="comment">
      <div class="comment__author">
        <AvatarComponent :avatar="commentData.user.avatar?.file" />
        <div class="comment__meta">
          <p class="comment__authorName">{{ commentData.user.username }}</p>
          <p class="comment__date">{{ formatCommentDate(commentData.created_at) }}</p>
        </div>
      </div>
      <p class="comment__text">{{ commentData.text }}</p>
    </div>
  </template>
  <div class="comment__inputBlock">
    <InputComponent class="comment__input" placeholder="Добавить комментарий" v-model="commentInput" />
    <ButtonComponent :disabled="commentInput.trim().length === 0" @click="addComment"> Отправить </ButtonComponent>
  </div>
</template>

<style lang="scss" scoped>
  .comment {
    margin-bottom: 12px;
    &__author {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 4px;
    }
    &__authorName {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 4px;
    }
    &__date {
      font-size: 14px;
      color: var(--color-grey);
    }
    &__inputBlock {
      display: flex;
      gap: 16px;
      align-items: center;
      margin-top: 36px;
    }
    &__input {
      margin-bottom: 0;
      width: 100%;
    }
  }
</style>
