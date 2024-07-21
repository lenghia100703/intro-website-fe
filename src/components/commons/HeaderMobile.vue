<script setup lang="ts">

import { useRouter } from 'vue-router'
import FAIcon from '@/components/commons/FAIcon.vue'
import { ref } from 'vue'
import MenuDrawers from '@/components/drawers/MenuDrawers.vue'

const router = useRouter()
const menuDrawers = ref<InstanceType<typeof MenuDrawers>>();

const handleOpenDrawer = () => {
    menuDrawers.value?.openDrawer()
}
</script>

<template>
    <div class='header-content'>
        <el-menu class='menu' mode='horizontal' text-color="#333" :ellipsis='false' active-text-color="#67c23a"
                 background-color='#fff' menu-trigger='click'
                 :default-active='$route.path' router>
            <el-menu-item class='desktop-logo-container no-hover' @click='router.push("/")'>
                <img class="desktop-logo" src="../../assets/images/logo.jpg" alt="logo" />
            </el-menu-item>
            <div class='flex-grow'></div>

            <div style="display: flex; align-items: center; margin-right: 8px" class='no-hover'>
                <el-button type="success" size='large' @click='handleOpenDrawer()'>
                    <FAIcon icon="fa-solid fa-bars" color="" size="large"  />
                </el-button>
            </div>
        </el-menu>
    </div>

    <MenuDrawers ref="menuDrawers" />
</template>

<style scoped>
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
</style>