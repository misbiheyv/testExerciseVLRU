<template>
    <div class="preview__wrapper">
        <aside class="preview__aside">
            <my-button class="action-btn">{{'Добавить задачу'}}</my-button>
            <sort-categories class="card-container"></sort-categories>
            <menu-categories class="card-container"></menu-categories>
            <card></card>
            <card></card>
            <card></card>
        </aside>
        <div class="preview__content">
            <div class="buttons__bar">

                <my-button>{{ 'Назад' }}</my-button>
                <my-button class="action-btn">{{ 'Редактировать' }}</my-button>
                <my-button class="delete-btn">{{ 'Удалить' }}</my-button>

            </div>
            <div class="card-container preview__card">
                <div class="preview__card">
                    <div class="card-label-title">название задачи</div>
                    <div class="info-block">Задача номер 4</div>
                    <div class="card-label-title">дата создания</div>
                    <div class="info-block">1 января 2022, 11:35</div>
                    <div class="card-label-title">приоритет</div>
                    <div class="info-block">высокий</div>
                    <div class="card-label-title">теги</div>
                    <div class="info-block">разработка</div>
                    <div class="card-label-title">описание</div>
                    <div class="info-block">Описание задачи 4</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SortCategories from "../components/SortCategories.vue"
import MenuCategories from "../components/MenuCategories.vue";
import MyButton from "../components/Button.vue";
import Card from "../components/Card.vue"

export default {
    components: { SortCategories, MenuCategories, MyButton, Card }
}
</script>

<style scoped>

.preview__wrapper {
    padding: 2vh 2vw;
}

.preview__aside {
    margin-right: 6%;
}

.preview__aside  * {
    margin-bottom: 2vh;
}

.preview__wrapper {
    display: flex;
    width: 100%
}
.preview__aside {
    width: 25%
}
.preview__content {
    width: 75%
}
.buttons__bar {
    display: flex;
    margin-bottom: 2vh;
}
.buttons__bar>*:last-child {
    margin-left: auto;
}
.buttons__bar>.action-btn {
    margin: 0 2vw;
}
.preview__card>*:nth-child(even) {
    margin-bottom: 3vh;
}

.preview__card>*:nth-child(odd) {
    margin-bottom: 1vh;
}

</style>