<script setup lang="ts">

import { useRoute } from 'vue-router'
import ProductCard from '@/components/cards/ProductCard.vue'
import { onMounted, ref } from 'vue'
import { loadingFullScreen } from '@/utils/loadingFullScreen'
import { getProductById, getProductByPage } from '@/services/product'

const route = useRoute()
const id = route.params.id
const product = ref()
const list_products = ref([])

const loadData = async () => {
    try {
        product.value = await getProductById(id)
        list_products.value = (await getProductByPage(1)).data
        list_products.value.filter(item =>
            item.id.toString() === id,
        ).slice(0, 3)
    } catch (e) {
        console.log(e)
    }
}

onMounted(async () => {
    loadingFullScreen()
    await loadData()
})
</script>

<template>
    <div class="title-page">
        <h1 class="intro-title">Chi tiết sản phẩm</h1>
    </div>
    <div class="spacing"></div>
    <div class="content">
        <el-row>
            <el-col class="mobile-margin-bottom-css" :xs='24' :sm='16' :md='14' :lg='11' :span="11">
                <div>
                    <img class="img-product" alt="img" :src="product?.image" />
                </div>
            </el-col>
            <el-col :xs='24' :sm='16' :md='14' :lg='11' :span="11">
                <div class="name-product">{{ product?.name }}</div>
                <div>
                    <el-text type="info" size="large" tag="b">Giá:</el-text>
                    <el-text size="large" tag="b" type="danger">Liên hệ giá tốt nhất</el-text>
                </div>
                <el-divider />
                <div class="name-product">Thông tin chi tiết</div>
                <div class="desc-product">
                    <el-text type="info" size="large" tag="b">
                        {{ product?.description }}
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
            <el-col :xs='24' :sm='11' :md='11' :lg='8' :span="8" v-for="item in list_products">
                <ProductCard :title="item.name" :img="item.image" :description="item.description"
                             :to='"/detail-product/" + item.id' />
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

@media only screen and (max-width: 767px) {
    .content {
        width: 85%;
    }

    .img-product {
        width: 100%;
    }

    .contact-info {
        width: 100%;
        padding: 8px 0;
    }

    .mobile-margin-bottom-css {
        margin-bottom: 30px;
    }
}
</style>