<template>
    <div class="edit__wrapper">
        <notification-card class="hidden" id="success-card"></notification-card>
        <notification-card :bgColor="'#F20519'" class="hidden" id="failure-card"></notification-card>
        <header class="edit__header">
            <my-button class="" @click="onClickBack">назад</my-button>
        </header>
        <div class="edit__content">
            <div class="card-container">
                <div class="card-label-title">название задачи</div>
                <input type="text" class="info-block title__input" v-model="card.title"/>

                <div class="card-label-title">приоритет</div>
                <select class="select-priority" name="select" v-model="card.priority">
                    <option value="hight">Высокий</option>
                    <option value="normal" selected>Нормальный</option>
                    <option value="low">Низкий</option>
                </select>

                <div class="card-label-title">теги</div>
                <select class="tags-list" name="select-tags" id="select-tags" size="3" v-model="card.tags" multiple>
                    <option value="develop">Разработка</option>
                    <option value="design">Дизайн</option>
                    <option value="analytics">Аналитика</option>
                </select>

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
import NotificationCard from '../components/NotificationCard.vue'
import RequestsService from '../services/requests.service'

export default {
    components: { MyButton, NotificationCard },

    async mounted() {
        console.log('id',this.$route.params.id)

        if (this.$route.params.id == 0) {
            this.newPost = true
        } else {
            const r = await RequestsService.getTaskById(this.$route.params.id)

            this.card.id = r.id
            this.card.title = r.title
            this.card.priority = r.priority
            this.card.tags = r.tags.split(',')
            this.card.creationDate = r.creationDate
            this.card.description = r.description
        }

        this.prevPage = this.$store.state.previousPage
        this.$store.state.previousPage = `edit/${this.card.id}`

        this.loaded = true
    },

    data() {
        return {
            card: {
                title: '',
                description: '',
                creationDate: '',
                priority: 'normal',
                tags: []
            },
            prevPage: '',
            newPost: false,
            loaded: false
        }
    },

    methods: {
        async onClickSave() {
            if (this.newPost) {
                console.log('create post')
                this.createPost()
            } else {
                console.log('update post')
                this.updatePost()
            }
        },

        async createPost() {
            const showCard = (id) => {
                document.getElementById(id).classList.remove('hidden')
                document.getElementById(id).firstElementChild.innerHTML = 'Задача сохранена!'
                setTimeout(function(){
                    document.getElementById(id).classList.add('hidden');
                }, 2000);
            }

            let res = await RequestsService.getRequest('save_card', this.card)
            if (!res.success) {
                return showCard('failure-card')
            }
            showCard('success-card')
            this.$router.push({path: `/edit/${res.id}`})
        },

        async updatePost() {
            const showCard = (id) => {
                document.getElementById(id).classList.remove('hidden')
                document.getElementById(id).firstElementChild.innerHTML = 'Задача обновлена!'
                setTimeout(function(){
                    document.getElementById(id).classList.add('hidden');
                }, 2000);
            }
            let res = await RequestsService.updateTask(this.card)
            if (!res.success) {
                return showCard('failure-card')
            }
            showCard('success-card')
        },

        onClickBack() {
            this.$router.push(`/${this.prevPage}`)
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
    height: 60px;
}

.card-container>*:nth-child(even) {
    margin-bottom: 3vh;
}

.card-container>*:nth-child(odd) {
    margin-bottom: 1vh;
}

.tags-list {
    max-height: 200px;
    width: 20%;
    border: solid 1px rgba(0, 0, 0, .3);
    font-size: 18px;
    line-height: 170%;
    border-radius: 3px;
}

.tags-list>option {
    cursor: pointer;
    padding: 5px 10px;
}

.tags-list>option:last-child {
    border: none;
}

.selected-tag {
    background-color: rgba(0, 0, 0, .3);
}

@media (max-width: 992px) {

    .select-priority, .tags-list{
        width: 100%;
    }
}

</style>