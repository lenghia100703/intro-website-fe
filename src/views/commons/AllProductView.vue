<script setup lang="ts">

import ProductCard from '@/components/cards/ProductCard.vue'
import { ref } from 'vue'
import { getProductByPage } from '@/services/product'

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
    },
    {
        name: 'Thùng carton 3 lớp',
        description: 'Thùng carton 3 lớp là bao bì chắc chắn, bảo vệ hàng hóa an toàn trong vận chuyển. Sản phẩm chịu lực tốt, phù hợp cho nhiều loại hàng hóa, và dễ dàng in ấn để quảng bá thương hiệu.',
        to: 'thung-carton-3',
    },
    {
        name: 'Thùng carton 3 lớp',
        description: 'Thùng carton 3 lớp là bao bì chắc chắn, bảo vệ hàng hóa an toàn trong vận chuyển. Sản phẩm chịu lực tốt, phù hợp cho nhiều loại hàng hóa, và dễ dàng in ấn để quảng bá thương hiệu.',
        to: 'thung-carton-3',
    }
]
</script>

<template>
    <div class="all-product-container">
        <div class="title-page">
            <h1 class="intro-title">Tất cả sản phẩm</h1>
        </div>
        <div class="spacing"></div>
        <div class="content">
            <el-row gutter="20">
                <el-col :span="8" v-for="item in fake_products">
                    <ProductCard :title="item.name" :description="item.description" :to="item.to" />
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