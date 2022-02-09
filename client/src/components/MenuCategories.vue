<template>
    <div>
        <div class="category">
            <div class="card-label-title">
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
            <div class="card-label-title">
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
.category:last-child {
    margin: 20px 0 0 0
}

</style>