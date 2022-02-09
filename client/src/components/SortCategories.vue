<template>
    <div>
        <div class="category">
            <div class="card-label-title sort__label-title">
                Приоритет
            </div>
            <ul class="category__labels">
                <form action="#">
                    <li> <input checked type="radio" id="radio_1" name="choose"> сначала новые </li>
                    <li> <input type="radio" id="radio_1" name="choose"> сначала старые </li>
                </form>
            </ul>
        </div>
    </div>
</template>

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