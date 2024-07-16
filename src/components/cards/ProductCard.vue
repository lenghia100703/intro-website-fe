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
    <div class="container">
        <div class="img-container">
            <img class="img" :src="props.img" alt="san-pham" />
        </div>
        <div class="cards">
            <div class="card-button">
                <el-button @click="handleClick" type="success" size="large" :icon="Right" circle />
            </div>
            <el-card style="border-radius: 20px">
                <div class="title">{{ props.title }}</div>
                <div class="text">{{ props.description }}</div>
            </el-card>
        </div>
    </div>
</template>

<style scoped>
.container {
    position: relative;
    text-align: center;
}

.img-container {
    position: relative;
    z-index: 1;
    border-radius: 20px;
}

.img {
    border-radius: 20px;
    width: 300px;
}

.cards {
    position: absolute;
    left: 50%;
    transform: translate(-40%, -20px);
    width: 280px;
    z-index: 10;
}

.card-button {
    height: 0;
    float: right;
    margin-top: -10px;
}

.card-button:hover {
    margin-top: -12px;
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
</style>
