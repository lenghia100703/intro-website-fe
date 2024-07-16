import { createRouter, createWebHistory } from 'vue-router'
import { PATHS } from '@/router/paths'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import NotAuthenticationLayout from '@/layouts/NotAuthenticationLayout.vue'
import { useAuthenticationStore } from '@/stores/useAuthenticationStore'
import NotConfirmLayout from '@/layouts/NotConfirmLayout.vue'
import HomeView from '@/views/commons/HomeView.vue'
import AboutView from '@/views/commons/AboutView.vue'
import ContactView from '@/views/commons/ContactView.vue'
import NewsView from '@/views/commons/NewsView.vue'
import LoginView from '@/views/commons/LoginView.vue'
import FieldView from '@/views/commons/FieldView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: PATHS.HOME,
            component: DefaultLayout,
            children: [
                {
                    path: PATHS.HOME,
                    component: HomeView,
                    name: 'home',
                },
                {
                    path: PATHS.ABOUT,
                    component: AboutView,
                    name: 'about',
                },
                {
                    path: PATHS.CONTACT,
                    component: ContactView,
                    name: 'contact',
                },
                {
                    path: PATHS.NEWS,
                    component: NewsView,
                    name: 'news',
                },
                {
                    path: PATHS.FIELD,
                    component: FieldView,
                    name: 'field',
                },
            ],
        },

        {
            path: PATHS.HOME,
            component: NotAuthenticationLayout,
            children: [
                {
                    path: PATHS.LOGIN,
                    component: LoginView,
                    name: 'login',
                },
            ],
        },

        {
            path: PATHS.HOME,
            component: NotConfirmLayout,
            children: [

            ]
        }
    ],
})

router.beforeEach(async (to, from, next) => {
    const authenticationStore = useAuthenticationStore()
    await authenticationStore.loadFromServer()
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    const userRole = authenticationStore.role

    if (requiresAuth && !authenticationStore.authenticated) {
        next({ name: 'login' })
    } else if (requiresAuth && to.meta.role && to.meta.role !== userRole) {
        next({ name: 'home' })
    } else if ((to.name === 'login' || to.name === 'register') && authenticationStore.authenticated) {
        next({ name: 'home' })
    } else {
        next()
    }
})

export { router }