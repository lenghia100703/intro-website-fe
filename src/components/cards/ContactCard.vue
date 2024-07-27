<script lang="ts" setup>

import FAIcon from '@/components/commons/FAIcon.vue'

const props = withDefaults(
    defineProps<{
        icon?: string
        title?: string
        description?: string
    }>(),
    {
        icon: 'fa-regular fa-map',
        title: 'Title',
        description: 'Description',
    },
)
</script>

<template>
    <el-card class="custom-contact-card" shadow="always">
        <div class="icon-container">
            <FAIcon :icon="props.icon" class="icon" color="#3878F7" />
        </div>
        <div class="title">{{ props.title }}</div>
        <div class="description">
            <el-text class="text">{{ props.description }}</el-text>
        </div>
    </el-card>
</template>

<style scoped>
.custom-contact-card {
    width: 330px;
    border-radius: 20px;
    text-align: center;
    min-height: 260px
}

.icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: #EDF5FF;
    width: 80px;
    height: 80px;
    margin: 0 auto;
}

.icon {
    font-size: 30px;
}

.title {
    font-size: 25px;
    font-weight: 600;
    margin: 10px 0;
}

.text {
    color: #687799;
    font-size: 17px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 11;
    overflow: hidden;
    text-overflow: ellipsis;
}

@media only screen and (max-width: 550px) {
    .custom-contact-card {
        width: 100%;
    }
}
</style>