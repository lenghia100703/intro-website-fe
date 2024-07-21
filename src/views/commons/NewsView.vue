<script setup lang="ts">

import { onMounted, ref } from 'vue'
import { loadingFullScreen } from '@/utils/loadingFullScreen'
import NewsCard from '@/components/cards/NewsCard.vue'
import { Search } from '@element-plus/icons-vue'
import { getNewsByPage } from '@/services/news'

const news = ref<any[]>([])
const totalData = ref<any>(3)
const searchValue = ref('')

const handleChangePage = async (val: any) => {
    await loadData(val)
}

const loadData = async (page: any) => {
    try {
        const res = await getNewsByPage(page)
        news.value = res.data
        console.table(news.value)
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
    <div class="news">
        <div class="title-page">
            <h1 class="news-title">Tin tức - Bài viết</h1>
        </div>
        <div class="spacing"></div>
        <div class="content">
            <div>
                <el-button style="background-color: #f0f9eb; color: #67c23a" type="success" round plain>Tin tức mới
                </el-button>
            </div>
            <br />
            <el-row justify="space-between">
                <el-col :span="11">
                    <div class="product-title">Theo dõi tin tức mới nhất của Công ty chúng tôi</div>
                </el-col>
                <el-col :span="6" style="display: flex; justify-content: flex-end; align-items: center;">
                    <el-input
                        v-model="searchValue"
                        size="large"
                        style="max-width: 800px"
                        placeholder="Tìm kiếm bài viết..."
                        class="input-with-select"
                        clearable
                        spellcheck="false"
                    >
                        <template #append>
                            <el-button style="width: 60px" type="success" :icon="Search" />
                        </template>
                    </el-input>
                </el-col>
            </el-row>
            <br />
            <el-row justify="space-between">
                <el-col style="margin-bottom: 40px" :span="7" v-for="item in news">
                    <NewsCard :title="item.title" :img="item.image" :description="item.description"
                              :to='"/detail-news/" + item.id' />
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
    <el-backtop :right="50" :bottom="100" />
</template>

<style scoped>
.news {
    margin: 0 auto;
}

.title-page {
    background-color: #f4ffed;
    padding: 50px 40px;
    text-align: center;
}

.news-title {
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

.pagination {
    margin-top: 30px;
    float: right;
}
</style>