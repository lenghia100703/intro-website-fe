import httpFile from '@/services/httpFile'
import { ProductAPI } from '@/constants/API'
import http from '@/services/http'

export const createProduct = async (payload: any) => {
    return (await httpFile.post(ProductAPI.CREATE_PRODUCT, payload)).data
}

export const getProductById = async (id: any) => {
    return (await http.get(ProductAPI.PRODUCT_BY_ID(id))).data.data
}

export const getAllProduct = async (page: any) => {
    return (await http.get(ProductAPI.LIST_PRODUCTS(page))).data
}

export const editProduct = async (productId: any, payload: any) => {
    await httpFile.put(ProductAPI.EDIT_PRODUCT(productId), payload)
}

export const deleteProduct = async (payload: any) => {
    await http.delete(ProductAPI.DELETE_PRODUCT(payload))
}