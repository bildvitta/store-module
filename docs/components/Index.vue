<template>
  <div class="index">
    <div class="index__content">
      <h1 class="index__title">StoreModule</h1>

      <div>
        Um gerador de stores de C.R.U.D. que funciona para <span>pinia</span> e <span>vuex</span>.
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.index {
  margin-top: 200px;
  display: flex;
  justify-content: center;
  text-align: center;

  &__title {
    margin-bottom: 20px;
    font-size: 40px;
  }

  span {
    font-weight: bold;
  }
}
</style>