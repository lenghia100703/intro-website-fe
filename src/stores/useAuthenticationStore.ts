import { defineStore } from 'pinia'
import { logout } from '@/services/auth'
import { getCurrentUser } from '@/services/user'
import { putLocalStorage, removeLocalStorage } from '@/helpers/localStorageHelper'

export const useAuthenticationStore = defineStore('authentication', {
    state: () => ({
        userInfo: null,
        role: String,
    }),
    getters: {
        authenticated: (state) => state.userInfo != null,
    },
    actions: {
        async loadFromServer() {
            try {
                const resUser = await getCurrentUser()
                this.userInfo = resUser.data
                this.role = resUser.data.role
                removeLocalStorage('sender')
                putLocalStorage('sender', resUser.data.email)
            } catch (e: any) {
                if (e.response && e.response.status === 401) {
                    this.userInfo = null
                }
            }
        },
        async logout() {
            try {
                await logout().then()
                this.userInfo = null
                this.role = ''
                removeLocalStorage('sender')
            } catch (e: any) {
                if (e.response && e.response.status === 401) {
                    this.userInfo = null
                }
            }
        },
    },
})