<template>
    <div class="edit__wrapper">
        <header class="edit__header">
            <my-button class="">назад</my-button>
        </header>
        <div class="edit__content">
            <div class="card-container">
                <div class="card-label-title">название задачи</div>
                <input type="text" class="info-block title__input" v-model="card.title"/>

                <div class="card-label-title">приоритет</div>
                <select class="select-priority" name="select" v-model="card.priority">
                    <option value="priority_3">Высокий</option>
                    <option value="priority_2" selected>Нормальный</option>
                    <option value="priority_1">Низкий</option>
                </select>

                <div class="card-label-title">теги</div>
                <ul class="scrollable-list">
                    <li>Разработка</li>
                    <li>Дизайн</li>
                    <li>Аналитика</li>
                </ul>

                <div class="card-label-title">описание</div>
                <textarea class="description_input" v-model="card.description">Описание задачи 4</textarea>

                <footer class="card__footer">
                    <my-button class="action-btn" @click="onClickSave">Сохранить</my-button>
                </footer>
            </div>
        </div>
    </div>
</template>

<script>
import MyButton from '../components/Button.vue'
import RequestsService from '../services/requests.service'

export default {
    components: { MyButton },
    data() {
        return {
            card: {
                title: '',
                description: '',
                dateOfCreation: '',
                priority: '',
                tags: []
            }
        }
    },
    methods: {
        async onClickSave() {
            await RequestsService.getRequest('save_card', this.card)
        }
    }
}
</script>

<style scoped>
.edit__wrapper {
    display: flex;
    width: 100%;
    flex-direction: column;
    padding: 3vh 2vw;
}

.edit__header {
    margin-bottom: 3vh;
}

.title__input {
    padding: 5px 10px;
    border-radius: 3px;
    border: solid 1px rgba(0, 0, 0, .3);
}

.select-priority {
    padding: 10px 10px;
    border: solid 1px rgba(0, 0, 0, .3);
    border-radius: 3px;
    font-size: 1.2em;
    width: 20%
}

.description_input {
    padding: 5px 10px;
    border-radius: 3px;
    font-size: 1.2em;
    border: solid 1px rgba(0, 0, 0, .3);
    resize: vertical;
    height: 100px;
}

.card-container>*:nth-child(even) {
    margin-bottom: 3vh;
}

.card-container>*:nth-child(odd) {
    margin-bottom: 1vh;
}

.scrollable-list {
    max-height: 200px;
    width: 20%;
    overflow:hidden; 
    overflow-y:scroll;
    border: solid 1px rgba(0, 0, 0, .3);
    padding: 5px 10px;
    font-size: 18px;
    line-height: 170%;
    border-radius: 3px;
}

.scrollable-list>li {
    /* border-bottom: solid 1px black; */
    cursor: pointer;
}

.scrollable-list>li:last-child {
    border: none;
}

</style>