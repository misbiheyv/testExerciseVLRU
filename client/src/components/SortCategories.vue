<template>
    <div class="category">
        <div class="card-label-title sort__label-title">
            Приоритет
        </div>
        <ul class="category__labels">
            <form class="categories__form" action="#" @change="onChange">
                <li v-for="option in options" :key="option.value" :value="option.value">
                    <input class="radio-area" type="radio" :id="option.value" name="category-choice"> 
                    <label class="radio-label" :for="option.value">{{ option.name }}</label>
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

.radio-area {
    position: absolute;
    z-index: -1;
    opacity: 0;
}

.radio-area+.radio-label {
    display: inline-flex;
    align-items: center;
    user-select: none;
}

.radio-area+.radio-label::before {
    content: '';
    display: inline-block;
    width: 1.3em;
    height: 1.3em;
    flex-shrink: 0;
    flex-grow: 0;
    border: 1px solid #adb5bd;
    border-radius: 50%;
    margin-right: 0.5em;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 50% 50%;
}
.radio-area:checked+.radio-label::before {
    border: 2px solid #5B48D9;
    /* background-color: #0b76ef; */
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='4' fill='%235B48D9'/%3e%3c/svg%3e");
}
</style>