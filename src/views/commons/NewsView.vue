<script setup lang="ts">

import { onMounted, ref } from 'vue'
import { loadingFullScreen } from '@/utils/loadingFullScreen'
import NewsCard from '@/components/cards/NewsCard.vue'
import { Search } from '@element-plus/icons-vue'
import { getNewsByPage } from '@/services/news'
import { searchNews } from '@/services/search'
import { convertDateTime } from '@/helpers/convertDateTime'

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
        totalData.value = res.totalData
    } catch (e) {
        console.log(e)
    }
}

const handleSearch = async (page: any, q: any) => {
    loadingFullScreen()
    try {
        const res = await searchNews(page, q)
        news.value = res.data
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
        <div class="spacing hidden-sm-and-down"></div>
        <div class="content">
            <el-row justify="space-between">
                <el-col :xs='24' :sm='16' :md='14' :lg='11' :span="11" style="margin-bottom: 20px">
                    <div class="hidden-sm-and-down">
                        <el-button style="background-color: #f0f9eb; color: #539f2f; font-size: 16px" type="success" round plain
                                   size="large">
                            Tin tức mới
                        </el-button>
                    </div>
                </el-col>
                <el-col :xs='24' :sm='16' :md='14' :lg='10' :span="6"
                        style="display: flex; justify-content: flex-end; align-items: center;">
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
                            <el-button style="width: 60px" type="success" :icon="Search"
                                       @click='handleSearch(1, searchValue)' />
                        </template>
                    </el-input>
                </el-col>
            </el-row>
            <br />
            <el-row gutter="20">
                <el-col v-if="news <= 0">
                    <h1 style="text-align: center">Không tìm thấy bài viết !</h1>
                </el-col>
                <el-col :xs='24' :sm='16' :md='14' :lg='8' :span="8" style="margin-bottom: 40px" v-for="item in news">
                    <NewsCard :title="item.title" :img="item.image" :description="item.description"
                              :to='"/detail-news/" + item.id' :createdAt="convertDateTime(item.createdAt)" />
                </el-col>
            </el-row>
            <div class='pagination'>
                <el-pagination
                    :page-size='6'
                    layout='prev, pager, next'
                    :total='totalData'
                    @current-change='handleChangePage'
                />
            </div>
        </div>
    </div>
</template>

<style scoped>
.news {
    margin: 0 auto;
}

.title-page {
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

.pagination {
    margin-top: 30px;
    float: right;
}

@media only screen and (max-width: 767px) {
    .content {
        width: 85%;
    }
}
</style>