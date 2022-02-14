<template>
    <div>    
        <ul class="feed"> <!--переместить onclick сюда-->
            <li v-for="task in tasks" :key="task.id" :id="task.id" @click="onClick">
                <card class="feed__card">
                    <template v-slot:title>{{ task.title.length===0 ? 'Без названия' : task.title }}</template>
                    <template v-slot:date>{{ task.creationDate }}</template>
                    <template v-slot:priority>{{ normalizePriority(task.priority) ?? 'не назначен' }}</template>
                    <template v-slot:tags>{{ normalizeTags(task.tags) ?? 'не указано' }}</template>
                </card>
            </li>
        </ul>
        <div ref="observer"></div>
    </div>
</template>

<script>

import Card from "../components/Card.vue";

export default {
    components: {Card},
    props: {
        tasks: {
            type: Array,
            default: () => []
        },
        currentSection: {
            type: Number,
        },
        maxSectionCount: {
            type: Number
        }
    },
    mounted() {
        const options = {
            rootMargin: '0px',
            threshold: 1.0
        }
        console.log(this.$store.state.tags)
        const callback = (entries) => {
            if (entries[0].isIntersecting && this.currentSection <= this.maxSectionCount){
                this.$emit('loadMorePosts')
                console.log('load',this.currentSection);
            }
        };

        const observer = new IntersectionObserver(callback, options);
        observer.observe(this.$refs.observer);
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
        normalizePriority(priority) {
            const o = this.$store.state.config.priority
            Object.hasOwnProperty.call(o, priority)
                return o[priority]
        },
        onClick(e) {
            this.$emit('onCardClick', e)
        }
    }
}

</script>

<style scoped>
li {
    cursor: pointer;
}
.feed__card {
    margin: 15px 0
}
.selected-task>div:first-child {
    background-color: green !important;
}

</style>