import { createStore } from 'vuex'

const store = createStore({
    state: {
        config: {
            priority: {
                'hight': 'Высокий',
                'normal': 'Средний',
                'low': 'Низкий',
            }
        },
        previousPage: ''
    },
    modules: {

    },
    getters: {

    },
    mutations: {
        
    }
})

export default store