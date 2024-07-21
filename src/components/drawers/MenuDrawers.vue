<template>
    <el-drawer modal-class="padding: 0" v-model="visible" size="100%" :show-close="false">
        <template #header="{ close, titleId, titleClass }">
            <div class='header-content'>
                <el-menu class='menu' mode='horizontal' text-color="#333" :ellipsis='false' active-text-color="#67c23a"
                         background-color='#fff' menu-trigger='click'
                         :default-active='$route.path' router>
                    <el-menu-item class='desktop-logo-container no-hover' @click='router.push("/")'>
                        <img class="desktop-logo" src="../../assets/images/logo.jpg" alt="logo" />
                    </el-menu-item>
                    <div class='flex-grow'></div>

                    <div style="display: flex; align-items: center; margin-right: 8px" class='no-hover'>
                        <el-button type="danger" @click="close">
                            <FAIcon icon="fa-solid fa-xmark" size="large" color="" />
                        </el-button>
                    </div>
                </el-menu>
            </div>
        </template>
        <div v-if="!authenticationStore.authenticated" class="group-btn-auth" style="background:linear-gradient(180deg, #fee1e1 0%, #fff 42.1%)">
            <el-row justify="space-between">
                <el-col :span="15">
                    <p class="">Đăng nhập hoặc đăng ký <br> để có thể liên hệ trực tiếp với chúng tôi</p>
                    <div>
                        <el-button type='success' plain round @click="router.push(PATHS.REGISTER)">Đăng ký</el-button>
                        <el-button type='success' round @click="router.push(PATHS.LOGIN)">Đăng nhập</el-button>
                    </div>
                </el-col>
                <el-col :xs='9' :sm='5' :md='5' :lg='5' :span="8">
                    <img src="https://fptshop.com.vn/img/login_mobile.png?w=360&q=60" alt="img-mobile" />
                </el-col>
            </el-row>
        </div>
        <div style="display: flex; align-items: center" v-else>
            <div class='name-user' @click="() => {router.push(PATHS.PROFILE); visible = false}">
                <el-avatar :src='userInfo?.avatar' class='avatar-image' />
                <span class='avatar'>{{ userInfo?.username }}</span>
                <FAIcon icon="fa-solid fa-angle-right" size="large" color="" style="margin: 3px 0 0 8px" />
            </div>
            <div class="flex-grow"></div>
            <div style="padding: 16px">
                <el-button type="danger" @click="handleLogout" size="large" plain round>Đăng xuất</el-button>
            </div>
        </div>
        <el-divider />
        <div>
            <el-menu active-text-color="#67c23a" :ellipsis='false' class='menu-bar' menu-trigger='click' mode='vertical' router>
                <el-menu-item v-if="authenticationStore?.role.toString() === role.ADMIN"
                              v-for="item in adminRoute"
                              :index='item.path' :route='item.path' @click='visible = false'>
                    <FAIcon size='large' :icon='item.icon' class='custom-icon' color="" />
                    {{ item.label }}
                </el-menu-item>
                <el-divider v-if="authenticationStore?.role.toString() === role.ADMIN" />
                <el-menu-item v-for="item in commonRoute"
                              :index='item.path' :route='item.path' @click='visible = false'>
                    <FAIcon size='large' :icon='item.icon' class='custom-icon' color="" />
                    {{ item.label }}
                </el-menu-item>
                <el-menu-item @click='visible = false'>
                    <FAIcon size='large' icon='fa-solid fa-xmark' class='custom-icon' color="" />
                    Đóng
                </el-menu-item>
            </el-menu>
        </div>
    </el-drawer>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import FAIcon from '@/components/commons/FAIcon.vue'
import { PATHS } from '@/router/paths.ts'
import { role } from '@/constants/role.ts'
import { useAuthenticationStore } from '@/stores/useAuthenticationStore.ts'
import { useRouter } from 'vue-router'

const authenticationStore = useAuthenticationStore()
const visible = ref<boolean>(false)
const userInfo = ref<any>()
const router = useRouter()

const adminRoute = [
    {
        path: PATHS.MANAGE_MESSAGE,
        icon: 'fa-regular fa-message',
        label: 'Quản lý tin nhắn',
    },
    {
        path: PATHS.MANAGE_NEWS,
        icon: 'fa-regular fa-newspaper',
        label: 'Quản lý tin tức',
    },
    {
        path: PATHS.MANAGE_PRODUCT,
        icon: 'fa-brands fa-product-hunt',
        label: 'Quản lý sản phẩm',
    },
]

const commonRoute = [
    {
        path: PATHS.ABOUT,
        icon: 'fa-regular fa-message',
        label: 'Giới thiệu',
    },
    {
        path: PATHS.FIELD,
        icon: 'fa-regular fa-newspaper',
        label: 'Lĩnh vực sản xuất',
    },
    {
        path: PATHS.ALL_PRODUCT,
        icon: 'fa-brands fa-product-hunt',
        label: 'Tất cả sản phẩm',
    },
    {
        path: PATHS.NEWS,
        icon: 'fa-brands fa-product-hunt',
        label: 'Tin tức',
    },
    {
        path: PATHS.CONTACT,
        icon: 'fa-brands fa-product-hunt',
        label: 'Liên hệ',
    },
]

const handleLogout = async () => {
    await authenticationStore.logout()
    await router.push(PATHS.LOGIN)
    visible.value = false
}

function openDrawer() {
    visible.value = true
    userInfo.value = authenticationStore.userInfo
}

watch(
    authenticationStore?.authenticated,
    async (newAuth) => {
        if (newAuth) {
            await authenticationStore.loadFromServer()
        }
    },
    {
        immediate: true,
    },
)

defineExpose({
    openDrawer,
})
</script>

<style scoped>
.group-btn-auth {
    padding: 16px 0 16px 16px;
}

.header-content {
    box-shadow: 0 3px 5px -2px #b8b8b8;
    width: 100%;
}

.desktop-logo {
    height: 40px;
    width: auto;
}

.flex-grow {
    flex-grow: 1;
}

.el-drawer__header {
    margin-bottom: 0;
}

.el-drawer {
    --el-drawer-padding-primary: 0 !important;
}

.el-menu {
    border: none;
}

.name-user {
    display: flex;
    align-items: center;
    padding: 10px 20px;
}

.avatar {
    margin-left: 8px;
}

.custom-icon {
    margin-right: 10px;
}

.avatar-image {
    height: 75px;
    width: 75px;
}

.avatar {
    font-size: 18px;
    font-weight: 600;
}
</style>

<style>
.el-drawer {
    --el-drawer-padding-primary: 0 !important;
}

.el-drawer__header {
    margin-bottom: 0;
}
</style>
