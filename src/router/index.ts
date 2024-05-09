import { createRouter, createWebHistory } from "vue-router";
import Test1 from '../components/Test1/index.vue'
import Test2 from '../components/Test2/index.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/test1',
            component: Test1
        },
        {
            path: '/test2',
            component: Test2
        }
    ]
})

export default router