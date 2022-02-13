<template>
    <div class="category">
        <div class="card-label-title sort__label-title">
            Приоритет
        </div>
        <ul class="category__labels">
            <form class="categories__form" action="#" @change="onChange">
                <li v-for="option in options" :key="option.value" :value="option.value">
                    <input type="radio" :id="`${option.value}`" name="category-choice"> {{ option.name }}
                </li>
            </form>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        modelValue: {
            type: String
        },
        options: {
            type: Array,
            default: () => []
        }
    },
    mounted() {
        document.querySelector('.categories__form').firstElementChild.firstChild.checked = true
    },
    methods: {
        onChange(e) {
            this.$emit('update:modelValue', e.target.id)
        }
    }
}
</script>

<style scoped>
ul li {
    line-height: 170%;
    font-size: 1.3rem;
    margin-left: 1vw;
}
.sort__label-title {
    margin-bottom: 1vh;
}
</style>