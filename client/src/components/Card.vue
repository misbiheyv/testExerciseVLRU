<template>
  <div class="card-container">
    <div class="card__title">
      <slot name="title"></slot>
    </div>

    <div class="card__info">
      <div class="info-block">Создано: <slot name="date"></slot></div>
      <div class="info-block">Приоритет: <slot name="priority"></slot></div>
      <div class="info-block">Отметки: <slot name="tags"></slot></div>
    </div>
  </div>
</template>

<style scoped>
.card__title {
  font-size: 1.8rem;
  line-height: 130%;
  margin-bottom: 2vh;
  overflow: hidden;
}
.info-block {
  overflow-wrap: break-word;
}
</style>
