<script setup lang="ts">

import FAIcon from '@/components/commons/FAIcon.vue'
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
        img: 'https://metis.vn/wp-content/uploads/2024/06/Screenshot-2024-06-17-at-14.23.23-1024x568.png',
        title: 'Title',
        to: '/',
        description: 'Description',
    },
)

const handleClick = () => {
    router.push(props.to)
}
</script>

<template>
    <div>
        <div @click="handleClick">
            <img class="img" :src="props.img" alt="img" />
        </div>
        <div class="title" @click="handleClick">
            {{ props.title }}
        </div>
        <div>
            <span>
                <FAIcon style="margin-right: 4px" icon="fa-regular fa-clock" color="" />
                13/07/2024
            </span>
        </div>
        <div class="description">{{ props.description }}</div>
    </div>
</template>

<style scoped>
.img {
    max-width: 350px;
    height: auto;
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
    color: #687799;
    font-size: 17px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>