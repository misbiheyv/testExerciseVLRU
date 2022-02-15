<template>
  <div class="menu__wrapper">
    <categories
      :category="'Приоритет'"
      :labels="['высокий', 'средний', 'низкий']"
    ></categories>
    <categories
      :category="'Отметка'"
      :labels="['дизайн', 'разработка', 'аналитика']"
    ></categories>
  </div>
</template>

<script>
import Categories from "./Categories.vue";
export default { components: { Categories } };
</script>

<style scoped>
.menu__wrapper {
  display: flex;
  flex-wrap: wrap;
}
</style>
