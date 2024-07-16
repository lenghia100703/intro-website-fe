<script setup lang='ts'>
import Header from '@/components/commons/Header.vue'
import Footer from '@/components/commons/Footer.vue'
import FAIcon from '@/components/commons/FAIcon.vue'
</script>

<template>
    <div class='common-layout'>
        <el-container>
            <el-header id='header'>
                <Header />
            </el-header>
            <el-main id='main'>
                <router-view></router-view>
            </el-main>
            <el-footer id="footer">
                <Footer />
            </el-footer>
        </el-container>
        <div class="contact-icon">
            <el-row>
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
    </div>
</template>

<style scoped>
.el-header {
    --el-header-padding: 0;
}

#main {
    padding: 0;
    overflow: hidden;
}

#footer {
    padding: 0;
}

.contact-icon {
    position: fixed;
    bottom: 200px;
    right: 50px;
    width: 40px;
    height: 40px;
}
</style>