<script setup lang='ts'>
import { useAuthenticationStore } from '@/stores/useAuthenticationStore'
import { ref } from 'vue'
import AvatarDrawers from '@/components/drawers/AvatarDrawers.vue'
import { useRouter } from 'vue-router'
import { PATHS } from '@/router/paths'

const authenticationStore = useAuthenticationStore()
authenticationStore.loadFromServer()
const infoRef = ref<InstanceType<typeof AvatarDrawers> | null>(null)

const router = useRouter()

const handleOpenDrawer = () => {
    infoRef.value?.openDrawer()
}
</script>

<template>
    <div class='header-content'>
        <template v-if='authenticationStore.authenticated'>
            <el-menu class='menu' mode='horizontal' :ellipsis='false' background-color='#e3eefc' menu-trigger='click'
                     :default-active='$route.path'>
                <el-menu-item class='desktop-logo-container no-hover' @click='router.push("/")'>
                    <h1>
                        Introduce
                    </h1>
                </el-menu-item>

                <div class='flex-grow'></div>
                <el-menu-item class='no-hover'>
                    Về chúng tôi
                </el-menu-item>
                <el-menu-item class='no-hover'>
                    <span class='name-user' @click='handleOpenDrawer'>
                        <el-avatar :src='authenticationStore?.userInfo?.avatar' />
                        <span class='avatar'>{{ authenticationStore?.userInfo?.username }}</span>
                    </span>
                </el-menu-item>
            </el-menu>
        </template>

        <template v-else>
            <el-menu class='menu' mode='horizontal' text-color="#333" :ellipsis='false' active-text-color="#67c23a" background-color='#fff' menu-trigger='click'
                     :default-active='$route.path' router>
                <el-menu-item class='desktop-logo-container no-hover' @click='router.push("/")'>
                    <img class="desktop-logo" src="../../assets/images/logo.jpg" alt="logo" />
                </el-menu-item>
                <div class='flex-grow'></div>
                <el-menu-item class='no-hover' :route='PATHS.HOME' :index='PATHS.HOME'>
                    <div class="custom-menu-item">TRANG CHỦ</div>
                </el-menu-item>
                <el-menu-item class='no-hover' :route='PATHS.ABOUT' :index='PATHS.ABOUT'>
                    <div class="custom-menu-item">GIỚI THIỆU</div>
                </el-menu-item>
                <el-menu-item class="no-hover" :route='PATHS.FIELD' :index='PATHS.FIELD'>
                    <div class="custom-menu-item">LĨNH VỰC SẢN XUẤT</div>
                </el-menu-item>
                <el-sub-menu class="no-hover" index="3">
                    <template #title>
                        <div class="custom-menu-item">SẢN PHẨM</div>
                    </template>
                    <el-menu-item>
                        <div class="custom-menu-item">
                            Thùng carton 3 lớp
                        </div>
                    </el-menu-item>
                    <el-menu-item>
                        <div class="custom-menu-item">
                            Thùng carton 5 lớp
                        </div>
                    </el-menu-item>
                    <el-menu-item>
                        <div class="custom-menu-item">
                            Giấy in offset
                        </div>
                    </el-menu-item>
                    <el-menu-item>
                        <div class="custom-menu-item">
                            Sản phầm từ bìa carton
                        </div>
                    </el-menu-item>
                </el-sub-menu>
                <el-menu-item class='no-hover' :route='PATHS.NEWS' :index='PATHS.NEWS'>
                    <div class="custom-menu-item">TIN TỨC</div>
                </el-menu-item>
                <el-menu-item class='no-hover' :route='PATHS.CONTACT' :index='PATHS.CONTACT'>
                    <div class="custom-menu-item">LIÊN HỆ</div>
                </el-menu-item>
                <el-menu-item
                    class='no-hover'
                    @click='router.push("/login")'
                >
                    <el-button type='success' round>ĐĂNG NHẬP</el-button>
                </el-menu-item>
            </el-menu>
        </template>
    </div>

    <AvatarDrawers ref='infoRef' />
</template>

<style scoped>
.header-content {
    box-shadow: 0 3px 5px -2px #b8b8b8;
}

.desktop-logo {
    width: auto;
    height: 55px;
}

.menu {
    color: white;
}

.flex-grow {
    flex-grow: 1;
}

.menu .no-hover:hover {
    background-color: transparent !important;
    color: var(--el-color-success) !important;
}

.name-user {
    display: flex;
    align-items: center;
}

.avatar {
    margin-left: 8px;
}

.hover-in-tag:hover {
    color: var(--el-color-primary);
}

.custom-menu-item {
    font-weight: 700;
}

.custom-menu-item:hover {
    color: var(--el-color-success) !important;
}
</style>