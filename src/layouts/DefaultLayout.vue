<script setup lang='ts'>

import Header from '@/components/commons/Header.vue'
import Footer from '@/components/commons/Footer.vue'
import FAIcon from '@/components/commons/FAIcon.vue'
import HeaderMobile from '@/components/commons/HeaderMobile.vue'
import FooterMobile from '@/components/commons/FooterMobile.vue'
import AddNewContact from '@/components/modals/message/AddNewContact.vue'
import { ref } from 'vue'

const addNewContact = ref<InstanceType<typeof AddNewContact>>()
</script>

<template>
    <div class='common-layout'>
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
                <el-button size="large" circle>
                    <FAIcon class='icon' style="font-size: 30px" icon='fa-brands fa-facebook' color="blue" />
                </el-button>
            </el-row>

            <el-row style="margin-top: 10px">
                <el-button size="large" circle>
                    <img style="width: 30px" src="../assets/images/zalo-icon.svg" alt="icon-zalo" />
                </el-button>
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

#main {
    padding: 0;
    overflow: hidden;
}

.footer {
    padding: 0;
}

.contact-icon {
    position: fixed;
    bottom: 250px;
    right: 50px;
    width: 40px;
    height: 40px;
}

@media only screen and (max-width: 600px) {
    .contact-icon {
        position: fixed;
        bottom: 200px;
        right: 20px;
        width: 40px;
        height: 40px;
    }
}
</style>