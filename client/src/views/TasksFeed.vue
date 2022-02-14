<template>
    <div class="wrapper">
        <aside class="feed__aside">
            <div class="card-container sort-categories">
                <sort-categories :options="sortOptions" v-model="selectedSort"></sort-categories>
            </div>
            <div class="card-container sort-categories">
                <menu-categories></menu-categories>
            </div>
        </aside>
        <div class="content">
            <router-link to="/edit">
                <my-button class="action-btn">{{'Добавить задачу'}}</my-button>
            </router-link>
            <feed :tasks="sortedTasks" :currentSection="currentSection" :maxSectionCount="maxSectionCount" @onCardClick="onCardClick" @loadMorePosts="loadMorePosts"></feed>
            <!-- <feed :tasks="sortedTasks" @onCardClick="onCardClick"></feed> -->
            <!-- <div ref="observer"></div> -->
        </div>
    </div>
</template>

<script>

import SortCategories from "../components/SortCategories.vue"
import MenuCategories from "../components/MenuCategories.vue";
import MyButton from "../components/Button.vue";
import RequestsService from '../services/requests.service';
import Feed from '../components/Feed.vue'

export default {
    components: { SortCategories, MenuCategories, MyButton, Feed },
    async mounted() {
        let res = await RequestsService.getTasks(this.currentSection,this.postsLimit);
        let countRes = await RequestsService.getRequest('getTasksCount');

        if(!countRes.success) {
            this.maxSectionCount = 1;
        } else {
            this.maxSectionCount = Math.ceil(countRes.count/this.postsLimit);
        }

        if(!res.success) return 0;
        this.cards = res.tasks;
        //! this.currentSection++;
        this.$store.state.previousPage = 'feed'

        // const options = {
        //     rootMargin: '0px',
        //     threshold: 1.0
        // }
        // const callback = (entries) => {
        //     if (entries[0].isIntersecting && this.currentSection <= this.maxSectionCount)
        //         this.loadMorePosts();
        // };

        // const observer = new IntersectionObserver(callback, options);
        // observer.observe(this.$refs.observer);
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
            sortOptions: [
                {value: 'newAhead', name: 'Сначала новые'},
                {value: 'oldAhead', name: 'Сначала старые'}
            ],
            selectedSort: '',
            postsLimit: 15,
            currentSection: 1,
            maxSectionCount: 1,
            cards: []
        }
    },
    methods: {
        onCardClick(e) {
            this.$router.push(`/preview/${e.currentTarget.id}`)
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
    .wrapper {
        display: flex;
        justify-content: space-around;
        align-items: flex-start;
        flex-grow: 1;
        padding: 2vh 2vw;
    }

    .aside-menu {
        background-color: white;
        padding: 1vh 2vw;
        display: flex;
        flex-direction: column;
        align-content: center;
        border: solid 1px rgba(0, 0, 0, 0.5);
        width: 20%;
    }

    .content {
        padding: 0 0 1vh 2vw;
        width: 80%;
    }

    .sort-categories:first-child {
        margin-bottom: 2vh;
    }
    
    .feed__aside {
        min-width: 20%;
    }
</style>