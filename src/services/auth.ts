import http from '@/services/http'
import { AuthAPI } from '@/constants/API'

export const login = async (payload: any) => {
    return await http.post(AuthAPI.LOGIN, payload)
}

export const logout = async () => {
    return await http.post(AuthAPI.LOGOUT)
}

export const registerUser = async (payload: any) => {
    return await http.post(AuthAPI.REGISTER, payload)
}
