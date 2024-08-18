<script setup lang='ts'>

import Header from '@/components/commons/Header.vue'
import Footer from '@/components/commons/Footer.vue'
import FAIcon from '@/components/commons/FAIcon.vue'
import HeaderMobile from '@/components/commons/HeaderMobile.vue'
import FooterMobile from '@/components/commons/FooterMobile.vue'
import AddNewContact from '@/components/modals/message/AddNewContact.vue'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

const addNewContact = ref<InstanceType<typeof AddNewContact>>()

const bannerHeight = ref(245)

const handleScroll = () => {
    const header = document.getElementById('header')
    const main = document.getElementById('main')
    const headerMobile = document.getElementById('header-mobile')

    if (header) {
        main.classList.remove('mobile-margin-top')
        if (window.scrollY > bannerHeight.value) {
            header.classList.add('fixed-header')
        } else {
            header.classList.remove('fixed-header')
        }
    }

    // if (headerMobile) {
    //     if (window.scrollY > 0) {
    //         headerMobile.classList.add('fixed-header')
    //         main.classList.add('mobile-margin-top')
    //     } else {
    //         headerMobile.classList.remove('fixed-header')
    //         main.classList.remove('mobile-margin-top')
    //     }
    // }
}

watch(
    () => bannerHeight.value,
    (value, oldValue, onCleanup) => {
        const banner = document.querySelector('img[alt="banner"]')
        if (banner) {
            bannerHeight.value = value
        }
        window.addEventListener('scroll', handleScroll)
    },
)

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
    <div class='common-layout'>
        <el-container>
            <img src="../assets/images/banner.png" alt="banner" class="hidden-sm-and-down header-position" />
            <el-header id='header' class='hidden-sm-and-down header-position'>
                <Header />
            </el-header>
            <el-header id="header-mobile" class='hidden-md-and-up header-position'>
                <HeaderMobile />
            </el-header>
            <el-main id='main'>
                <router-view></router-view>
            </el-main>
            <el-footer class='footer hidden-sm-and-down'>
                <Footer />
            </el-footer>
            <el-footer class='footer hidden-md-and-up'>
                <FooterMobile />
            </el-footer>
        </el-container>
        <div class="contact-icon">
            <el-row>
                <el-button size="large" @click="addNewContact?.openModal()" circle>
                    <FAIcon class='icon' style="font-size: 25px" icon='fa-regular fa-message' color="blue" />
                </el-button>
            </el-row>

            <el-row style="margin-top: 10px">
                <el-link href="https://www.facebook.com/profile.php?id=61563084612410" target="_blank"
                         :underline="false">
                    <el-button size="large" circle>
                        <FAIcon class='icon' style="font-size: 30px" icon='fa-brands fa-facebook' color="blue" />
                    </el-button>
                </el-link>
            </el-row>

            <el-row style="margin-top: 10px">
                <el-link href="mailto:baobianquycuong@gmail.com"
                         :underline="false">
                    <el-button size="large" circle>
                        <FAIcon class='icon' size='large' icon='fa-regular fa-envelope' color="red" />
                    </el-button>
                </el-link>
            </el-row>

            <el-row style="margin-top: 10px">
                <el-link href="https://zalo.me/0846881815" target="_blank" :underline="false">
                    <el-button size="large" circle>
                        <img style="width: 30px" src="../assets/images/zalo-icon.svg" alt="icon-zalo" />
                    </el-button>
                </el-link>
            </el-row>
        </div>
        <el-backtop class="hidden-sm-and-down" :right="50" :bottom="100" />
        <el-backtop class="hidden-md-and-up" :right="20" :bottom="50" />
    </div>
    <AddNewContact ref="addNewContact" />
</template>

<style scoped>
.el-header {
    --el-header-padding: 0;
}

.header-position {
    width: 100%;
}

.fixed-header {
    position: fixed;
    top: 0;
    z-index: 1000;
}

.mobile-margin-top {
    margin-top: 60px;
}

#main {
    padding: 0;
    overflow: hidden;
}

.footer {
    padding: 0;
}

.contact-icon {
    position: fixed;
    bottom: 300px;
    right: 50px;
    width: 40px;
    height: 40px;
}

@media only screen and (max-width: 600px) {
    .contact-icon {
        position: fixed;
        bottom: 250px;
        right: 20px;
        width: 40px;
        height: 40px;
    }
}
</style>