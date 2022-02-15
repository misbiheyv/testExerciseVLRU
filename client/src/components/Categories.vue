<template>
  <div class="category">
    <div class="card-label-title menu__label-title">
      {{ category }}
    </div>
    <ul class="category__labels">
      <form action="#">
        <li v-for="name in labels" :key="name + new Date()">
            <input
              class="checkbox-area"
              type="checkbox"
              :name="name"
              :id="name"
            />
            <label :for="name" class="checkbox-label">{{ name }}</label>
        </li>
      </form>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    labels: {
      type: Array,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
};
</script>
<style scoped>
.category {
  margin: 1vh 0 1vh 0;
}

.menu__label-title {
  margin-left: 1vw;
}

.category__labels {
  line-height: 180%;
  font-size: 1.3rem;
  margin-left: 1.2vw;
}

.checkbox-area {
  position: absolute;
  z-index: -1;
  opacity: 0;
}
.checkbox-label {
  display: inline-flex;
  align-items: center;
  user-select: none;
}
.checkbox-label::before {
  content: "";
  display: inline-block;
  width: 1.4em;
  height: 1.4em;
  flex-shrink: 0;
  flex-grow: 0;
  border: 1px solid #adb5bd;
  border-radius: 0.25em;
  margin-right: 0.5em;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 65% 65%;
}
.checkbox-area:checked + .checkbox-label::before {
  border: 2px solid #0091da;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' version='1.1' width='24' height='24' x='0' y='0' viewBox='0 0 507.506 507.506' style='enable-background:new 0 0 512 512' xml:space='preserve'%3E%3Cg%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M163.865,436.934c-14.406,0.006-28.222-5.72-38.4-15.915L9.369,304.966c-12.492-12.496-12.492-32.752,0-45.248l0,0 c12.496-12.492,32.752-12.492,45.248,0l109.248,109.248L452.889,79.942c12.496-12.492,32.752-12.492,45.248,0l0,0 c12.492,12.496,12.492,32.752,0,45.248L202.265,421.019C192.087,431.214,178.271,436.94,163.865,436.934z' fill='%230091da' data-original='%23000000'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}
</style>
