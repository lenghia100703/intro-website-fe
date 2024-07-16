export const AuthAPI = {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESEND_CONFIRMATION: '/auth/resend-confirmation',
    CONFIRM_REGISTRATION: '/auth/confirm-registration',
}


export const UserAPI = {
    GET_CURRENT_USER: '/user/me',
    ALL_USERS: '/user',
    LIST_USERS: (page: any) => `/user?page=${page}`,
    USER_ROLE: '/user/role',
    EDIT_USER: (userId: any) => `/user/${userId}`,
    DELETE_USER: (userId: any) => `/user/${userId}`,
    CREATE_USER: '/user',
    USER_BY_ID: (userId: any) => `/user/${userId}`,
    CHANGE_PASSWORD: (userId: any) => `/user/change-password/${userId}`,
    ID_ROLE: (id: any, role: any) => `/user/${role}/${id}` // có cả Construction và User
}

export const NewsAPI = {
    ALL_NEWS: `/news`,
    LIST_NEWS: (page: any) => `/news?page=${page}`,
    EDIT_NEWS: (newsId: any) => `/news/${newsId}`,
    DELETE_NEWS: (newsId: any) => `/news/${newsId}`,
    CREATE_NEWS: '/news',
    NEWS_BY_ID: (newsId: any) => `/news/${newsId}`,
}

export const ProductAPI = {
    ALL_PRODUCT: `/product`,
    LIST_PRODUCTS: (page: any) => `/product?page=${page}`,
    EDIT_PRODUCT: (productId: any) => `/product/${productId}`,
    DELETE_PRODUCT: (productId: any) => `/product/${productId}`,
    CREATE_PRODUCT: '/product',
    PRODUCT_BY_ID: (productId: any) => `/product/${productId}`,
}



