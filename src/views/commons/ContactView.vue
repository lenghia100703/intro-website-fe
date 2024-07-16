<script setup lang="ts">
import { onMounted } from 'vue'
import { loadingFullScreen } from '@/utils/loadingFullScreen'
import { GoogleMap, Marker } from 'vue3-google-map'
import ContactCard from '@/components/cards/ContactCard.vue'

const center = { lat: 20.8378657, lng: 105.3430343 }

const contact = [
    {
        title: 'Địa chỉ',
        description: 'Số 73, Đại lộ Thịnh Lang, Phường Thịnh Lang, TP. Hòa Bình, Tỉnh Hòa Bình',
        icon: 'fa-regular fa-map'
    },
    {
        title: 'Số điện thoại',
        description: '084 688 1815 – 091 394 5746',
        icon: 'fa-solid fa-phone'
    },
    {
        title: 'Địa chỉ Email',
        description: 'baobianquycuong@gmail.com',
        icon: 'fa-regular fa-envelope'
    },
]

onMounted(() => {
    loadingFullScreen()
})
</script>

<template>
    <div class="contact">
        <div class="title-page">
            <h1 class="contact-title">Liên hệ</h1>
        </div>
        <div class="spacing"></div>
        <div class="content">
            <div>
                <el-button  style="background-color: #f0f9eb; color: #67c23a" type="success" round plain>Liên hệ với chúng tôi</el-button>
            </div>
            <br />
            <el-row justify="space-between">
                <el-col :span="11">
                    <div class="product-title">Hãy liên hệ và tìm hiểu thêm về chúng tôi</div>
                </el-col>
            </el-row>
            <br />
            <el-row justify="space-between">
                <el-col :span="11">
                    <GoogleMap
                        api-key="AIzaSyAAW4kIQfRSxfpKQaysriN2G766CvY5Kbw"
                        style="width: 100%; height: 400px"
                        :center="center"
                        :zoom="16"
                    >
                        <Marker :options="{ position: center }" />
                    </GoogleMap>
                </el-col>
                <el-col :span="11">
                    <div>
                        <el-text size="large" tag="b">Công ty Cổ phần Đầu tư và Thương mại An Quý Cường</el-text>
                    </div>
                    <br />
                    <div>
                        <el-text size="large" tag="b">Địa chỉ liên hệ: </el-text>
                        <el-text size="large">Số 73, Đại lộ Thịnh Lang, Phường Thịnh Lang, TP. Hòa Bình, Tỉnh Hòa Bình</el-text>
                    </div>
                    <br />
                    <div>
                        <el-text size="large" tag="b">Số giấy chứng nhận đăng ký kinh doanh:</el-text>
                    </div>
                    <br />
                    <div>
                        <el-text size="large" tag="b">Email: </el-text>
                        <el-text size="large" type="primary">baobianquycuong@gmail.com</el-text>
                    </div>
                    <br />
                    <div>
                        <el-text size="large" tag="b">Hotline: </el-text>
                        <el-text size="large" type="primary">084 688 1815 – 091 394 5746</el-text>
                    </div>
                </el-col>
            </el-row>
            <br />
            <br />
            <br />
            <el-row justify="space-between">
                <el-col :span="7" v-for="item in contact">
                    <ContactCard :title="item.title" :description="item.description" :icon="item.icon" />
                </el-col>
            </el-row>
        </div>
    </div>
    <el-backtop :right="50" :bottom="100" />
</template>

<style scoped>
.contact {
    margin: 0 auto;
}

.title-page {
    background-color: #f4ffed;
    padding: 50px 40px;
    text-align: center;
}

.contact-title {
    font-size: 35px;
    font-weight: 800;
}

.spacing {
    height: 50px;
}

.content {
    width: 75%;
    margin: 0 auto;
}

.product-title {
    font-size: 30px;
    font-weight: 800;
}
</style>