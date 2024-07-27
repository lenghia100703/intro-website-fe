<script setup lang='ts'>

import Header from '@/components/commons/Header.vue'
import HeaderMobile from '@/components/commons/HeaderMobile.vue'
</script>

<template>
    <div class='common-layout'>
        <el-container>
            <el-container>
                <el-header id='header' class='hidden-sm-and-down'>
                    <Header />
                </el-header>
                <el-header class='hidden-md-and-up'>
                    <HeaderMobile />
                </el-header>
                <el-main id='main'>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<style scoped>
.el-header {
    --el-header-padding: 0;
}

#header {
    z-index: 20;
}

#main {
    padding-top: 0;
    overflow: hidden;
}

@media only screen and (max-width: 767px) {
    #main {
        padding: 0;
    }
}
</style>