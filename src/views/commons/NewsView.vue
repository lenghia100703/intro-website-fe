<script setup lang="ts">
import { onMounted } from 'vue'
import { loadingFullScreen } from '@/utils/loadingFullScreen.ts'
import NewsCard from '@/components/cards/NewsCard.vue'
import { Search } from '@element-plus/icons-vue'

const news = [
    {
        to: '/news/1',
        title: 'Bao jumbo quai ống: Ưu-nhược điểm',
        description: 'Bao Jumbo quai hình ống là một loại bao FIBC đặc biệt được tạo ra để giúp cho việc bốc xếp bằng xe nâng được dễ dàng hơn. Hai đai này được làm từ chính loại vải tạo nên bao jumbo nên có độ bền cơ học cao cũng như khả năng chịu tải lớn.'
    },
    {
        to: '/news/1',
        title: 'Bao jumbo quai ống: Ưu-nhược điểm',
        description: 'Bao Jumbo quai hình ống là một loại bao FIBC đặc biệt được tạo ra để giúp cho việc bốc xếp bằng xe nâng được dễ dàng hơn. Hai đai này được làm từ chính loại vải tạo nên bao jumbo nên có độ bền cơ học cao cũng như khả năng chịu tải lớn.'
    },
    {
        to: '/news/1',
        title: 'Bao jumbo quai ống: Ưu-nhược điểm',
        description: 'Bao Jumbo quai hình ống là một loại bao FIBC đặc biệt được tạo ra để giúp cho việc bốc xếp bằng xe nâng được dễ dàng hơn. Hai đai này được làm từ chính loại vải tạo nên bao jumbo nên có độ bền cơ học cao cũng như khả năng chịu tải lớn.'
    },
    {
        to: '/news/1',
        title: 'Bao jumbo quai ống: Ưu-nhược điểm',
        description: 'Bao Jumbo quai hình ống là một loại bao FIBC đặc biệt được tạo ra để giúp cho việc bốc xếp bằng xe nâng được dễ dàng hơn. Hai đai này được làm từ chính loại vải tạo nên bao jumbo nên có độ bền cơ học cao cũng như khả năng chịu tải lớn.'
    },
]

onMounted(() => {
    loadingFullScreen()
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
                <el-button  style="background-color: #f0f9eb; color: #67c23a" type="success" round plain>Tin tức mới</el-button>
            </div>
            <br />
            <el-row justify="space-between">
                <el-col :span="11">
                    <div class="product-title">Theo dõi tin tức mới nhất của Công ty chúng tôi</div>
                </el-col>
                <el-col :span="6" style="display: flex; justify-content: flex-end; align-items: center;">
                    <el-input
                        v-model="input3"
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
                    <NewsCard :title="item.title" :description="item.description" :to="item.to" />
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
    width: 75%;
    margin: 0 auto;
}

.product-title {
    font-size: 30px;
    font-weight: 800;
}
</style>