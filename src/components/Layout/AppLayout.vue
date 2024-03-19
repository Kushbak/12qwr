<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<style lang="scss">
  .container {
    max-width: 1140px;
    width: 100%;
    margin: 0 auto;
    @media (max-width: 1140px) {
      max-width: 720px;
    }
    @media (min-width: 576px) {
      max-width: 540px;
    }
    @media (min-width: 768px) {
      max-width: 720px;
    }
    @media (min-width: 992px) {
      max-width: 960px;
    }
    @media (min-width: 1440px) {
      max-width: 1140px;
    }
  }
</style>
