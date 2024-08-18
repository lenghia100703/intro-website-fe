<script lang="ts" setup>

import FAIcon from '@/components/commons/FAIcon.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = withDefaults(
    defineProps<{
        img?: string
        to?: string
        title?: string
        description?: string
        createdAt?: string
    }>(),
    {
        img: 'https://metis.vn/wp-content/uploads/2024/06/Screenshot-2024-06-17-at-14.23.23-1024x568.png',
        title: 'Title',
        to: '/',
        description: 'Description',
        createdAt: '2019-06-17T00:00:00.000Z',
    },
)

const handleClick = () => {
    router.push(props.to)
}
</script>

<template>
    <div>
        <div @click="handleClick">
            <img :src="props.img" alt="img" class="img" />
        </div>
        <div class="title" @click="handleClick">
            {{ props.title }}
        </div>
        <div style="margin: 4px 0">
            <span>
                <FAIcon color="" icon="fa-regular fa-clock" style="margin-right: 4px" />
                {{ props.createdAt }}
            </span>
        </div>
        <div class="description">{{ props.description }}</div>
    </div>
</template>

<style scoped>
.img {
    width: 100%;
    height: 250px;
    border-radius: 20px;
    cursor: pointer;
}

.title {
    font-size: 20px;
    font-weight: 700;
    cursor: pointer;
}

.title:hover {
    color: var(--el-color-success);
}

.description {
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
        height: auto;
    }
}
</style>