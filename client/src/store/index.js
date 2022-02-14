import { createStore } from 'vuex'

const store = createStore({
    state: {
        config: {
            priority: {
                'hight': 'Высокий',
                'normal': 'Средний',
                'low': 'Низкий',
            },
            tags: {
                'develop': 'Разработка',
                'design': 'Дизайн',
                'analytics': 'Аналитика',
            }
        },
        previousPage: ''
    }
})

export default store