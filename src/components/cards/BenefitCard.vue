<script setup lang="ts">

import FAIcon from '@/components/commons/FAIcon.vue'

const props = withDefaults(
    defineProps<{
        number?: string
        icon?: string
        title?: string
        description?: string
    }>(),
    {
        number: '01',
        icon: 'fa-solid fa-piggy-bank',
        title: 'Title',
        description: 'Description',
    },
)
</script>

<template>
    <el-card class="custom-card" body-style="padding: 0 0 40px 40px" shadow="always">
        <div class="elementor-widget-container">
            <div class="elementor-widget">
                <h2 class="number">{{ props.number }}</h2>
            </div>
        </div>
        <div>
            <FAIcon :icon="props.icon" color="#67c23a" class="icon" />
        </div>
        <div class="title">{{ props.title }}</div>
        <div class="description">
            <el-text class="text">{{ props.description }}</el-text>
        </div>
    </el-card>
</template>

<style scoped>
.elementor-widget-container {
    display: flex;
    justify-content: flex-end;
    height: 80px;
}

.custom-card {
    max-width: 60%;
    border-radius: 50px;
}

.elementor-widget {
    padding: 30px 25px 30px 30px;
    background-color: #EDF5FF;
    border-radius: 0 30px 0 50px;
}

.number {
    margin-top: -9px;
    color: var(--el-color-success);
    font-weight: 800;
    font-size: 25px;
}

.icon {
    font-size: 60px;
}

.title {
    font-size: 25px;
    font-weight: 600;
    margin: 10px 0;
}

.description {
    margin-right: 40px;
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

@media only screen and (max-width: 883px) {
    .title {
        height: 80px;
    }

    .custom-card {
        max-width: 100%;
    }
}
</style>