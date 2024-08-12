<script setup lang='ts'>
import { useAuthenticationStore } from '@/stores/useAuthenticationStore'
import { onMounted, ref } from 'vue'
import AvatarDrawers from '@/components/drawers/AvatarDrawers.vue'
import { useRouter } from 'vue-router'
import { PATHS } from '@/router/paths'
import { getProductByPage } from '@/services/product'

const authenticationStore = useAuthenticationStore()
authenticationStore.loadFromServer()
const infoRef = ref<InstanceType<typeof AvatarDrawers> | null>(null)

const router = useRouter()

const products = ref([])

const loadProduct = async () => {
    try {
        products.value = (await getProductByPage(0)).data
    } catch (e) {
        console.log(e)
    }
}

const handleOpenDrawer = () => {
    infoRef.value?.openDrawer()
}

onMounted(async () => {
    await loadProduct()
})
</script>

<template>
    <div class='header-content'>
        <template v-if='authenticationStore.authenticated'>
            <el-menu class='menu' mode='horizontal' text-color="#333" :ellipsis='false' active-text-color="#67c23a"
                     background-color='#fff' menu-trigger='click'
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
                <el-sub-menu class="no-hover">
                    <template #title>
                        <div class="custom-menu-item">SẢN PHẨM</div>
                    </template>
                    <el-menu-item :route='PATHS.ALL_PRODUCT' :index='PATHS.ALL_PRODUCT'>
                        <div class="custom-menu-item">
                            Tất cả sản phẩm
                        </div>
                    </el-menu-item>
                    <el-menu-item v-for="product in products" :key="product.id" :route='"/detail-product/" + product.id'
                                  :index='"/detail-product/" + product.id'>
                        <div class="custom-menu-item">
                            {{ product.name }}
                        </div>
                    </el-menu-item>
                </el-sub-menu>
                <el-menu-item class='no-hover' :route='PATHS.NEWS' :index='PATHS.NEWS'>
                    <div class="custom-menu-item">TIN TỨC</div>
                </el-menu-item>
                <el-menu-item class='no-hover' :route='PATHS.CONTACT' :index='PATHS.CONTACT'>
                    <div class="custom-menu-item">LIÊN HỆ</div>
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
            <el-menu class='menu' mode='horizontal' text-color="#333" :ellipsis='false' active-text-color="#67c23a"
                     background-color='#fff' menu-trigger='click'
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
                <el-sub-menu class="no-hover">
                    <template #title>
                        <div class="custom-menu-item">SẢN PHẨM</div>
                    </template>
                    <el-menu-item :route='PATHS.ALL_PRODUCT' :index='PATHS.ALL_PRODUCT'>
                        <div class="custom-menu-item">
                            Tất cả sản phẩm
                        </div>
                    </el-menu-item>
                    <el-menu-item v-for="product in products" :key="product.id" :route='"/detail-product/" + product.id'
                                  :index='"/detail-product/" + product.id'>
                        <div class="custom-menu-item">
                            {{ product.name }}
                        </div>
                    </el-menu-item>
                </el-sub-menu>
                <el-menu-item class='no-hover' :route='PATHS.NEWS' :index='PATHS.NEWS'>
                    <div class="custom-menu-item">TIN TỨC</div>
                </el-menu-item>
                <el-menu-item class='no-hover' @click='router.push(PATHS.CONTACT)'>
                    <el-button type='danger' round class="shake">LIÊN HỆ</el-button>
                </el-menu-item>
                <el-menu-item
                    class='no-hover'
                    @click='router.push(PATHS.LOGIN)'
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

.custom-menu-item {
    font-weight: 700;
}

.custom-menu-item:hover {
    color: var(--el-color-success) !important;
}

@keyframes shake {
    0%, 100% {
        transform: translate(0, 0) rotate(0);
    }
    10%, 90% {
        transform: translate(-2px, -2px) rotate(-2deg);
    }
    20%, 80% {
        transform: translate(2px, 2px) rotate(2deg);
    }
    30%, 50%, 70% {
        transform: translate(-4px, -4px) rotate(-4deg);
    }
    40%, 60% {
        transform: translate(4px, 4px) rotate(4deg);
    }
}

.shake {
    animation: shake 1.5s ease-in-out infinite;
    animation-delay: 3s;
    transform-origin: center;
}

</style>