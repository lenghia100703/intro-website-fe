<template>
    <div class="message-list-item" @click="handleRoute">
        <img class="avatar" :src="props.avatar" alt="avatar" />
        <el-row class='hidden-sm-and-down'>
            <el-col>
                <el-text tag="b">{{ props.username }}</el-text>
            </el-col>
            <el-col>
                <el-text size="small" type="info">{{ props.email }}</el-text>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts" setup>

import { useRouter } from 'vue-router'
import { useAuthenticationStore } from '@/stores/useAuthenticationStore'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const authenticationStore = useAuthenticationStore()
const { authenticated } = storeToRefs(authenticationStore)
const router = useRouter()
const props = withDefaults(
    defineProps<{
        avatar?: string
        username?: string
        email?: string
    }>(),
    {
        avatar: 'https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg',
        username: '',
        email: '',
    },
)

const emit = defineEmits(['select'])

const handleRoute = () => {
    if (!authenticated.value) {
        router.push({
            name: 'messages',
            params: {
                email: props.email,
            },
        })
    } else {
        emit('select', [props.email, props.username, props.avatar])
        router.push('/admin/manage-message/t/' + props.email)
    }
}

onMounted(() => {
    authenticationStore.loadFromServer()
})
</script>

<style scoped>
.message-list-item {
    padding: 8px 16px 8px 8px;
    display: flex;
    align-items: center;
    cursor: pointer;
    border-radius: 12px;
}

.message-list-item + .message-list-item {
    margin-top: 8px;
}

.avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 16px;
    border: solid 1px gray;
}

.message-list-item:hover {
    background-color: #f0f1f4;
}
</style>
