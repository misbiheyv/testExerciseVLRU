<template>
    <div class="wrapper">
        <aside class="aside">
            <div class="card-container sort-categories">
                <sort-categories></sort-categories>
            </div>
            
            <div class="card-container sort-categories">
                <menu-categories></menu-categories>
            </div>
        </aside>
        <div class="content">
            <my-button class="action-btn"></my-button>
            <ul class="feed">
                <li> <card class="card"></card></li>
                <li> <card class="card"></card></li>
                <li> <card class="card"></card></li>
            </ul>
        </div>
    </div>
</template>

<script>
import Card from "../components/Card.vue";
import SortCategories from "../components/SortCategories.vue"
import MenuCategories from "../components/MenuCategories.vue";
import MyButton from "../components/Button.vue";

export default {
    components: { Card,  SortCategories, MenuCategories, MyButton }
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
        width: 20%
    }
    li {
        cursor: pointer;
    }
    .action-btn {
        background-color: #0091da;
        color: white;
    }
    .card {
        margin: 15px 0
    }
    .content {
        padding: 0 0 1vh 2vw;
        width: 80%
    }
    .sort-categories:first-child {
        margin-bottom: 2vh;
    }
    .aside {
        min-width: 20%
    }
</style>