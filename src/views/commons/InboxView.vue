<template>
    <el-row>
        <el-col :span="6" class="left">
            <div style="display: flex">
                <div class="title">Đoạn chat</div>
                <div class="flex-grow"></div>
                <div class="hidden-sm-and-down">
                    <el-button size="large" type="info" :icon="Edit" circle plain />
                </div>
            </div>
            <el-divider />
            <MessageList :avatar="ADMIN.AVATAR"
                         :username="ADMIN.USERNAME"
                         :email="ADMIN.EMAIL" />
        </el-col>

        <el-col :span="18" class="right">
            <h1>Tin nhắn của bạn</h1>
            <el-text type="info">Gửi tin nhắn cho bạn bè</el-text>
        </el-col>
    </el-row>
</template>

<script lang="ts" setup>
import { Edit } from '@element-plus/icons-vue'
import MessageList from '@/components/commons/MessageList.vue'
import { onMounted } from 'vue'
import { loadingFullScreen } from '@/utils/loadingFullScreen'
import { ADMIN } from '@/constants/admin'

onMounted(() => {
    loadingFullScreen()
})
</script>

<style scoped>
.left {
    height: calc(100vh - 100px);
    padding: 16px 16px;
    border-right: 1px solid #dcdfe6;
}

.right {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.title {
    font-size: 24px;
    font-weight: 700;
}

.flex-grow {
    flex-grow: 1;
}

@media only screen and (max-width: 767px) {
    .title {
        font-size: 15px;
        text-align: center;
    }

    .left {
        padding: 12px 8px 16px 8px;
    }

    .right {
        padding: 0 8px 0 8px;
    }
}
</style>
