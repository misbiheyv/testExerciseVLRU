<template>
    <div class="preview__wrapper">
        <aside class="preview__aside">
            <router-link to="/edit"><my-button class="action-btn">{{'Добавить задачу'}}</my-button></router-link>
            <my-button class="filters-btn" v-if="mobile" @click="onFiltersClick">{{'Фильтры'}}</my-button>

            <div class="aside__actions" :class="{'hidden': mobile}">
                <sort-categories class="card-container" :options="sortOptions" v-model="selectedSort"></sort-categories>
                <menu-categories class="card-container"></menu-categories>
            </div>
            <feed :tasks="sortedTasks" :currentSection="currentSection" :maxSectionCount="maxSectionCount" @onCardClick="onCardClick" @loadMorePosts="loadMorePosts"></feed>
        </aside>
        <div class="preview__content">
            <div class="buttons__bar">

                <my-button @click="onClickBack">{{ 'Назад' }}</my-button>
                <router-link :to="`/edit/${this.card.id}`">
                    <my-button v-if="mobile" class="action-btn"> 
                        <template v-slot>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 17 18" fill="none">
                                <path d="M11.6066 0.5C11.7392 0.5 11.8664 0.552678 11.9602 0.646447L14.7886 3.47487C14.9838 3.67014 14.9838 3.98672 14.7886 4.18198L5.59619 13.3744C5.53337 13.4372 5.45495 13.4821 5.369 13.5046L1.54057 14.5046C1.36883 14.5494 1.18617 14.4999 1.06066 14.3744C0.93514 14.2489 0.885581 14.0662 0.930441 13.8945L1.93044 10.066C1.95289 9.98007 1.99784 9.90165 2.06066 9.83883L11.253 0.646447C11.3468 0.552678 11.474 0.5 11.6066 0.5Z" fill="#FFF"/>
                                <path d="M1 16.25C0.585786 16.25 0.25 16.5858 0.25 17C0.25 17.4142 0.585786 17.75 1 17.75H16C16.4142 17.75 16.75 17.4142 16.75 17C16.75 16.5858 16.4142 16.25 16 16.25H1Z" fill="#FFF"/>
                            </svg>
                        </template> 
                    </my-button>
                    <my-button v-else class="action-btn">{{ 'Редактировать' }}</my-button>
                </router-link> 
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
    created() {
        this.mobile = window.innerWidth <= 767
        window.onresize = () => {this.mobile = window.innerWidth <= 767};
    },
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
            loaded: false,
            mobile: false
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
        },
        async onCardClick(e) {
            await this.$router.push(`/preview/${e.currentTarget.id}`)
            location.reload();
        },
        async loadMorePosts() {
            let res = await RequestsService.getTasks(this.currentSection, this.postsLimit);
            this.currentSection++;
            if(!res.success) return 0;
            this.selectedSort = 'newAhead';
            this.cards = [...this.cards, ...res.tasks];
        },
        onFiltersClick() {
            let el = document.querySelector('.aside__actions').classList
            console.log(el.contains('hidden'))
            if(el.contains('hidden')) {
                el.remove('hidden')
            } else {
                el.add('hidden')
            }
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
.filters-btn {
    display: none;
}

@media (max-width: 992px) {
    .preview__wrapper {
        flex-direction: column-reverse;
    }
    .preview__content {
        width: 100%;
        margin-bottom: 2vh;
    }
    .preview__aside {
        width: 100%;
    }
    .action-btn {
        display: block;
        text-align: center;
    }
}

@media (max-width: 767px) { 
    .filters-btn {
        display: block;
        text-align: center;
    }
}

</style>