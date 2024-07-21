<script setup lang="ts">

import ProductCard from '@/components/cards/ProductCard.vue'
import { onMounted, ref } from 'vue'
import { getProductByPage } from '@/services/product'
import { loadingFullScreen } from '@/utils/loadingFullScreen'

const products = ref<any[]>([])
const totalData = ref<any>(3)

const handleChangePage = async (val: any) => {
    await loadData(val)
}

const loadData = async (page: any) => {
    try {
        const res = await getProductByPage(page)
        products.value = res.data
        totalData.value = res.totalData
    } catch (e) {
        console.log(e)
    }
}

onMounted(async () => {
    loadingFullScreen()
    await loadData(1)
})
</script>

<template>
    <div class="all-product-container">
        <div class="title-page">
            <h1 class="intro-title">Tất cả sản phẩm</h1>
        </div>
        <div class="spacing"></div>
        <div class="content">
            <el-row gutter="20">
                <el-col :xs='24' :sm='16' :md='14' :lg='8' :span="8" v-for="item in products">
                    <ProductCard :title="item.name" :img="item.image" :description="item.description"
                                 :to='"/detail-product/" + item.id' />
                </el-col>
            </el-row>

            <div class='pagination'>
                <el-pagination
                    :page-size='8'
                    layout='prev, pager, next'
                    :total='totalData'
                    @current-change='handleChangePage'
                />
            </div>
        </div>
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

.pagination {
    margin-top: 30px;
    float: right;
}
</style>