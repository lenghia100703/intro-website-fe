<script setup lang="ts">

import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { loadingFullScreen } from '@/utils/loadingFullScreen'
import { getNewsById } from '@/services/news'

const route = useRoute()
const id = route.params.id

const news = ref()

const loadData = async () => {
    try {
        news.value = await getNewsById(id)
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
    <div class="news">
        <div class="title-page">
            <h1 class="news-title">Tin tức - Bài viết</h1>
        </div>
        <div class="spacing"></div>
        <div class="content">
            <el-row justify="space-between">
                <el-col>
                    <div class="product-title">{{ news?.title }}</div>
                </el-col>
                <el-divider style="margin-bottom: 8px" />
                <el-col>
                    <el-text tag="b" type="info" size="small">{{ news?.createdAt }}</el-text>
                </el-col>
            </el-row>

            <el-row justify="center">
                <el-col style="display: flex; justify-content: center">
                    <img class="img-news" :src="news?.image" alt="img" />
                </el-col>
                <el-col style="display: flex; justify-content: center; margin-bottom: 30px">
                    <el-text tab="i" type="info" size="small">Hình minh họa cho {{ news?.title }}</el-text>
                </el-col>
                <el-col>
                    <div class="news-desc">
                        {{ news?.description }}
                    </div>
                </el-col>
            </el-row>
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
    width: 60%;
    margin: 0 auto;
}

.product-title {
    font-size: 24px;
    font-weight: 800;
}

.news-desc {
    color: #687799;
    font-size: 17px;
}

.img-news {
    max-width: 700px;
}
</style>