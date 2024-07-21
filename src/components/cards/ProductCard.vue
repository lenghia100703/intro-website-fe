<script setup lang="ts">
import { Right } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = withDefaults(
    defineProps<{
        img?: string
        to?: string
        title?: string
        description?: string
    }>(),
    {
        img: 'https://baobinhuamienbac.com/images/attachment/thumb/2913bao-jumbo-dung-hat-dieu-hanh-nhan-xuat-khau.jpg',
        to: '/',
        title: 'Title',
        description: 'Description',
    },
)

const handleClick = () => {
    router.push(props.to)
}
</script>

<template>
    <el-row justify="center" class="card-container">
        <el-col :span="24" class="img-container">
            <div class="image-wrapper">
                <img class="img" :src="props.img" alt="san-pham" />
                <div class="card-button">
                    <el-button @click="handleClick" type="success" size="large" :icon="Right" circle />
                </div>
            </div>
        </el-col>
        <el-col :span="19" class="cards">
            <el-card style="border-radius: 20px; position: relative;">
                <div class="title">{{ props.title }}</div>
                <div class="text">{{ props.description }}</div>
            </el-card>
        </el-col>
    </el-row>
</template>

<style scoped>
.card-container {
    text-align: center;
    margin-top: 20px;
}

.img-container {
    border-radius: 20px;
}

.image-wrapper {
    position: relative;
}

.img {
    border-radius: 20px;
    width: 300px;
}

.cards {
    width: 280px;
    margin-top: -20px;
}

.card-button {
    position: absolute;
    bottom: 0;
    right: 50px;
    z-index: 2;
}

.card-button:hover {
    bottom: 2px;
}

.title {
    font-size: 20px;
    font-weight: 700;
}

.text {
    color: #687799;
    font-size: 17px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    text-overflow: ellipsis;
}

@media only screen and (max-width: 550px) {
    .img {
        width: 100%;
    }
}
</style>
