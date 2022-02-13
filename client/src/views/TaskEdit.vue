<template>
    <div class="edit__wrapper">
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
                <ul class="scrollable-list" @click="onTagClick">
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
    props: [
        'titleP',
        'descriptionP',
        'dateOfCreationP',
        'priorityP',
        'tagsP',
    ],

    async mounted() {
        if (this.$route.params.id) {
            const r = await RequestsService.getTaskById(this.$route.params.id)

            this.card.id = r.id
            this.card.title = r.title
            this.card.priority = r.priority
            this.card.tags = r.tags
            this.card.creationDate = r.creationDate
            this.card.description = r.description
        }
        const el = document.querySelector('.scrollable-list')
        el.childNodes.forEach((el, index) => el.id = `li-${index}`)

        this.prevPage = this.$store.state.previousPage
        this.$store.state.previousPage = `edit/${this.card.id}`

        this.loaded = true
    },

    data() {
        return {
            card: {
                title: '',
                description: '',
                dateOfCreation: '',
                priority: '',
                tags: []
            },
            prevPage: '',
            tags: {},
            loaded: false
        }
    },

    methods: {
        async onClickSave() {
            for (const tag in this.tags) {
                if (tag % 2 !== 0) 
                    this.card.tags.push(tag)
            }

            let res = await RequestsService.getRequest('save_card', this.card)
            if (!res.success) {
                return alert('Failure')
            }

            alert('Created')
        },

        onTagClick(e) {
            if(e.target.innerHTML in this.tags) {
                this.tags[e.target.innerHTML] += 1
            } else {
                this.tags[e.target.innerHTML] = 1
            }
            
            if (this.tags[e.target.innerHTML] % 2 !== 0) {
                e.target.classList.add('selected-tag')
            } else {
                e.target.classList.remove('selected-tag')
            }
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
    /* padding: 5px 10px; */
    font-size: 18px;
    line-height: 170%;
    border-radius: 3px;
}

.scrollable-list>li {
    /* border-bottom: solid 1px black; */
    cursor: pointer;
    padding: 5px 10px;
}

.scrollable-list>li:last-child {
    border: none;
}

.selected-tag {
    background-color: rgba(0, 0, 0, .3);
}

</style>