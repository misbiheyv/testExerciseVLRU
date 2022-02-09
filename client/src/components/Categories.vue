<template>
    <div class="category">
        <div class="card-label-title menu__label-title">
            {{ category }}
        </div>
        <ul class="category__labels">
            <form action="#">
                <li v-for="name in labels" :key="name+new Date()">
                    <input type="checkbox" name="name" id="key"> {{ name }}
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
            required: true
        },
        category: {
            type: String,
            required: true
        }
    },
    data() {
        return {
        }
    }
}
</script>
<style scoped>

.category {
    margin: 1vh 0 1vh 0
}

.menu__label-title {
    margin-left: 1vw;
}

.category__labels {
    line-height: 180%;
    font-size: 1.3rem;
    margin-left: 1.2vw;
}
</style>