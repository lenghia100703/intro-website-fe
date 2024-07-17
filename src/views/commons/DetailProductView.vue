<script setup lang="ts">

import { useRoute } from 'vue-router'
import ProductCard from '@/components/cards/ProductCard.vue'

const route = useRoute()
const id = route.params.id

const product = {
    name: 'Thùng carton 3 lớp',
    image: 'https://baobinhuamienbac.com/images/attachment/thumb/2913bao-jumbo-dung-hat-dieu-hanh-nhan-xuat-khau.jpg',
    description: 'Thùng carton 3 lớp là bao bì chắc chắn, bảo vệ hàng hóa an toàn trong vận chuyển. Sản phẩm chịu lực tốt, phù hợp cho nhiều loại hàng hóa, và dễ dàng in ấn để quảng bá thương hiệu.',
    to: '/detail-product/1',
}

const fake_products = [
    {
        name: 'Thùng carton 3 lớp',
        description: 'Thùng carton 3 lớp là bao bì chắc chắn, bảo vệ hàng hóa an toàn trong vận chuyển. Sản phẩm chịu lực tốt, phù hợp cho nhiều loại hàng hóa, và dễ dàng in ấn để quảng bá thương hiệu.',
        to: '/detail-product/1',
    },
    {
        name: 'Thùng carton 5 lớp',
        description: 'Thùng carton 3 lớp là bao bì chắc chắn, bảo vệ hàng hóa an toàn trong vận chuyển. Sản phẩm chịu lực tốt, phù hợp cho nhiều loại hàng hóa, và dễ dàng in ấn để quảng bá thương hiệu.',
        to: 'thung-carton-5',
    },
    {
        name: 'Thùng carton 3 lớp',
        description: 'Thùng carton 3 lớp là bao bì chắc chắn, bảo vệ hàng hóa an toàn trong vận chuyển. Sản phẩm chịu lực tốt, phù hợp cho nhiều loại hàng hóa, và dễ dàng in ấn để quảng bá thương hiệu.',
        to: 'thung-carton-3',
    }
]
</script>

<template>
    <div class="title-page">
        <h1 class="intro-title">Chi tiết sản phẩm</h1>
    </div>
    <div class="spacing"></div>
    <div class="content">
        <el-row>
            <el-col :span="11">
                <div>
                    <img class="img-product" alt="img" :src="product.image" />
                </div>
            </el-col>
            <el-col :span="11">
                <div class="name-product">{{ product.name }}</div>
                <div>
                    <el-text type="info" size="large" tag="b">Giá: </el-text>
                    <el-text size="large" tag="b" type="danger">Liên hệ giá tốt nhất</el-text>
                </div>
                <el-divider />
                <div class="name-product">Thông tin chi tiết</div>
                <div class="desc-product">
                    <el-text type="info" size="large" tag="b">
                        {{ product.description }}
                    </el-text>
                </div>
                <el-divider />
                <div class="contact">
                    <div class="contact-info">
                        <div style="font-weight: 600">
                            TƯ VẤN BÁN HÀNG
                        </div>
                        <div style="color: yellow; font-size: 24px; font-weight: 800">
                            091 394 5746
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
        <br />
        <br />
        <div>
            <el-button style="background-color: #f0f9eb; color: #67c23a" type="success" round plain>
                Một vài sản phẩm khác
            </el-button>
        </div>
        <br />
        <el-row gutter="20">
            <el-col :span="8" v-for="item in fake_products">
                <ProductCard :title="item.name" :description="item.description" :to="item.to" />
            </el-col>
        </el-row>
    </div>
</template>

<style scoped>
.title-page {
    background-color: #f4ffed;
    padding: 50px 40px;
    text-align: center;
}

.content {
    width: 75%;
    margin: 0 auto;
    padding-bottom: 50px;
}

.spacing {
    height: 50px;
}

.intro-title {
    font-size: 35px;
    font-weight: 800;
}

.name-product {
    font-size: 22px;
    font-weight: 700;
}

.contact-info {
    width: 160px;
    text-align: center;
    background-color: red;
    color: white;
    padding: 8px 12px;
    border-radius: 12px;
}

.img-product {
    width: 450px;
    height: auto;
}
</style>