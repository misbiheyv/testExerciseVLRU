<template>
  <div class="notification-wrapper">
    <div class="text-wrapper">Задача создана</div>
  </div>
</template>

<script>
export default {
  props: {
    bgColor: {
      type: String,
      default: "#04D9C4",
    },
    fontColor: {
      type: String,
      default: "white",
    },
  },
};
</script>

<style scoped>
.notification-wrapper {
  position: absolute;
  right: 1vw;
  height: 100px;
  width: 300px;
  background-color: v-bind(bgColor);
  color: v-bind(fontColor);
  border-radius: 3px;
  -webkit-box-shadow: 0px 0px 11px -7px rgba(34, 60, 80, 1);
  -moz-box-shadow: 0px 0px 11px -7px rgba(34, 60, 80, 1);
  box-shadow: 0px 0px 11px -7px rgba(34, 60, 80, 1);
  text-align: center;
  font-size: 1.5rem;
  line-height: 150%;
}

.text-wrapper {
  padding-top: 30px;
}

@media (max-width: 576px) {
  .notification-wrapper {
    width: 90%;
    left: 0;
    left: 0;
    margin: auto;
  }
}
</style>
