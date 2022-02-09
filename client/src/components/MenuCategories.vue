<template>
    <div class="menu__wrapper">
        <div class="category">
            <div class="card-label-title menu__label-title">
                Приоритет
            </div>
            <ul class="category__labels">
                <form action="#">
                    <li> <input type="checkbox"> высокий</li>
                    <li> <input type="checkbox"> средний</li>
                    <li> <input type="checkbox"> низкий</li>
                </form>
            </ul>
        </div>

        <div class="category">
            <div class="card-label-title menu__label-title">
                Отметка
            </div>
            <ul class="category__labels">
                <form action="#">
                    <li> <input type="checkbox"> Дизайн</li>
                    <li> <input type="checkbox"> Разработка</li>
                    <li> <input type="checkbox"> Изучение</li>
                </form>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        }
    }
</script>

<style scoped>
.menu__label-title {
    margin-bottom: 1vh;
}
.category:last-child {
    margin: 2vh 0 0 0
}

ul li {
    line-height: 180%;
    font-size: 1.3rem;
    margin-left: 1vw;
}
</style>