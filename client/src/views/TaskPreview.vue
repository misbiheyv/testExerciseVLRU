<template>
    <div class="preview__wrapper">
        <aside class="preview__aside">
            <router-link to="/edit"><my-button class="action-btn">{{'Добавить задачу'}}</my-button></router-link>
            <sort-categories class="card-container" :options="sortOptions" v-model="selectedSort"></sort-categories>
            <menu-categories class="card-container"></menu-categories>
            <feed :tasks="sortedTasks" :currentSection="currentSection" :maxSectionCount="maxSectionCount" @onCardClick="onCardClick" @loadMorePosts="loadMorePosts"></feed>
        </aside>
        <div class="preview__content">
            <div class="buttons__bar">

                <my-button @click="onClickBack">{{ 'Назад' }}</my-button>
                <router-link :to="`/edit/${this.card.id}`"><my-button class="action-btn">{{ 'Редактировать' }}</my-button></router-link> 
                <my-button @click="onClickDelete" class="delete-btn">{{ 'Удалить' }}</my-button>

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
                    <div class="info-block">{{ normalizeTags(card.tags) }}</div>

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
import RequestsService from '../services/requests.service'
import Feed from '../components/Feed.vue'

export default {
    components: { SortCategories, MenuCategories, MyButton, Feed },
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

        let res = await RequestsService.getTasks(this.currentSection,this.postsLimit);
        let countRes = await RequestsService.getRequest('getTasksCount');

        if(!countRes.success) {
            this.maxSectionCount = 1;
        } else {
            this.maxSectionCount = Math.ceil(countRes.count/this.postsLimit);
        }

        if(!res.success) return 0;
        this.cards = res.tasks;
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
            postsLimit: 15,
            currentSection: 1,
            maxSectionCount: 1,
            cards: [],
            loaded: false
        }
    },

    methods: {
        normalizeTags(tags) {
            if(tags.length === 0)
                return null
            const o = this.$store.state.config.tags
            return tags.split(',').map(tag => {
                if (Object.hasOwnProperty.call(o, tag))
                    return o[tag]
            }).join(' ').toLowerCase()
        },
        onClickBack() {
            this.$router.push(`/${this.prevPage}`)
        },
        onClickDelete() {
            if (this.card.id){
                RequestsService.deleteTask(this.card.id)
                this.$router.push({path: `/feed`})
            } 
            // for (const key in this.card) {
            //     if (Object.hasOwnProperty.call(this.card, key)) {
            //         this.card[key] = ''
            //     }
            // }
        },
        onCardClick(e) {
            this.$router.push(`/feed`)
            this.$router.push(`/preview/${e.currentTarget.id}`)
            window.scrollTo(scrollX, 0);
        },
        async loadMorePosts() {
            let res = await RequestsService.getTasks(this.currentSection, this.postsLimit);
            this.currentSection++;
            if(!res.success) return 0;
            this.selectedSort = 'newAhead';
            this.cards = [...this.cards, ...res.tasks];
        }
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
.buttons__bar .action-btn {
    margin: 0 2vw;
}
.preview__card>*:nth-child(even) {
    margin-bottom: 3vh;
}

.preview__card>*:nth-child(odd) {
    margin-bottom: 1vh;
}
.info-block {
    overflow-wrap: break-word;
}
</style>