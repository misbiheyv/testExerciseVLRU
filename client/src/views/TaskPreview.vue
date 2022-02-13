<template>
    <div class="preview__wrapper">
        <aside class="preview__aside">
            <router-link to="/edit"><my-button class="action-btn">{{'Добавить задачу'}}</my-button></router-link>
            <sort-categories class="card-container" :options="sortOptions" v-model="selectedSort"></sort-categories>
            <menu-categories class="card-container"></menu-categories>
            <card></card>
            <card></card>
            <card></card>
        </aside>
        <div class="preview__content">
            <div class="buttons__bar">

                <my-button @click="onClickBack">{{ 'Назад' }}</my-button>
                <router-link :to="`/edit/${this.card.id}`"><my-button class="action-btn">{{ 'Редактировать' }}</my-button></router-link> 
                <my-button class="delete-btn">{{ 'Удалить' }}</my-button>

            </div>
            <div class="card-container preview__card" v-if="loaded">
                <div class="preview__card">
                    <div class="card-label-title">Название</div>
                    <div class="info-block">{{ card.title ?? 'Без названия' }}</div>

                    <div class="card-label-title">дата создания</div>
                    <div class="info-block">{{ card.creationDate }}</div>

                    <div class="card-label-title">приоритет</div>
                    <div class="info-block">{{ this.priorityCfg[card.priority] }}</div>

                    <div class="card-label-title">теги</div>
                    <div class="info-block">{{ card.tags }}</div>

                    <div class="card-label-title">описание</div>
                    <div class="info-block">{{ card.description }}</div>
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
import RequestsService from '../services/requests.service'

export default {
    components: { SortCategories, MenuCategories, MyButton, Card },
    async mounted() {
        this.prevPage = this.$store.state.previousPage

        const r = await RequestsService.getTaskById(this.$route.params.id)

        this.card.id = r.id
        this.card.title = r.title
        this.card.priority = r.priority
        this.card.tags = r.tags
        this.card.creationDate = r.creationDate
        this.card.description = r.description

        this.priorityCfg = this.$store.state.config.priority
        this.$store.state.previousPage = `preview/${this.card.id}`
        this.loaded = true
    },
    computed: {
        sortedTasks(cur) {
            switch (cur.selectedSort) {
                case 'newAhead':
                    return [...this.cards].sort((a, b) => Number(new Date(b.creationDate)) > Number(new Date(a.creationDate))?1:-1)
                    
                case 'oldAhead':
                    return [...this.cards].sort((a, b) => Number(new Date(a.creationDate)) > Number(new Date(b.creationDate))?1:-1)

                default:
                    return [...this.cards].sort((a, b) => Number(new Date(b.creationDate)) > Number(new Date(a.creationDate))?1:-1)

            }
        }
    },
    data() {
        return {
            prevPage: '',
            card: {
                title: '',
                description: '',
                dateOfCreation: '',
                priority: '',
                tags: [],
                priorityCfg: ''
            },
            sortOptions: [
                {value: 'newAhead', name: 'Сначала новые'},
                {value: 'oldAhead', name: 'Сначала старые'}
            ],
            selectedSort: '',
            loaded: false
        }
    },

    methods: {
        onClickBack() {
            this.$router.push(`/${this.prevPage}`)
        },
        // onClickEdit() {
        //     console.log(this.$router)
        //     console.log(this.$route)
        //     this.$router.push(`edit/${this.card.id}`)
        // }
    }
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