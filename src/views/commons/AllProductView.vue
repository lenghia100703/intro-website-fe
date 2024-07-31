<script setup lang="ts">

import ProductCard from '@/components/cards/ProductCard.vue'
import { onMounted, ref } from 'vue'
import { getProductByPage } from '@/services/product'
import { loadingFullScreen } from '@/utils/loadingFullScreen'
import { Search } from '@element-plus/icons-vue'
import { searchProduct } from '@/services/search'

const products = ref<any[]>([])
const totalData = ref<any>(3)
const searchValue = ref('')

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

const handleSearch = async (page: any, q: any) => {
    loadingFullScreen()
    try {
        const res = await searchProduct(page, q)
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
            <el-row justify="space-between">
                <el-col :xs='24' :sm='16' :md='14' :lg='11' :span="11">

                </el-col>
                <el-col :xs='24' :sm='16' :md='14' :lg='8' :span="8"
                        style="display: flex; justify-content: flex-end; align-items: center;">
                    <el-input
                        v-model="searchValue"
                        size="large"
                        style="max-width: 800px"
                        placeholder="Tìm kiếm sản phẩm..."
                        class="input-with-select"
                        clearable
                        spellcheck="false"
                    >
                        <template #append>
                            <el-button style="width: 60px" type="success" :icon="Search" @click='handleSearch(1, searchValue)' />
                        </template>
                    </el-input>
                </el-col>
            </el-row>
            <br />

            <el-row gutter="20">
                <el-col :xs='24' :sm='16' :md='14' :lg='8' :span="8" v-for="item in products">
                    <ProductCard :title="item.name" :img="item.image" :description="item.description"
                                 :to='"/detail-product/" + item.id' />
                </el-col>
            </el-row>

            <div class='pagination'>
                <el-pagination
                    :page-size='3'
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