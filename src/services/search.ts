import http from '@/services/http'
import { SearchAPI } from '@/constants/API'

export const searchNews = async (page: any, q: any) => {
    return (await http.get(SearchAPI.SEARCH_NEWS(page, q))).data
}

export const searchProduct = async (page: any, q: any) => {
    return (await http.get(SearchAPI.SEARCH_PRODUCT(page, q))).data
}