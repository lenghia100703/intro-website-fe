<template>
    <el-row>
        <el-col :span="6" class="left">
            <div class="mobile-title" style="display: flex; align-items: center">
                <div class="title">Đoạn chat</div>
                <div class="flex-grow"></div>
                <div class='hidden-sm-and-down'>
                    <el-button size="large" type="success" :icon="Edit" circle plain />
                </div>
            </div>
            <el-divider />
            <MessageList v-if="!authenticated"
                         :avatar="adminInfo?.avatar"
                         :username="adminInfo?.username"
                         :email="adminInfo?.email"
            />
        </el-col>

        <el-col :span="18" class="right">
            <div class="message-list-item-container">
                <div class="message-list-item" v-if="!authenticated">
                    <img
                        class="avatar"
                        :src="adminInfo?.avatar"
                        alt="avatar"
                    />
                    <el-row>
                        <el-col>
                            <el-text tag="b">{{ adminInfo?.username }}</el-text>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <el-divider />
            <MessageDetail :sender="getLocalStorage('sender')" class="input-text" />
        </el-col>
    </el-row>
</template>

<script lang="ts" setup>
import { Edit } from '@element-plus/icons-vue'
import MessageList from '@/components/commons/MessageList.vue'
import MessageDetail from '@/components/commons/MessageDetail.vue'
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useAuthenticationStore } from '@/stores/useAuthenticationStore'
import { storeToRefs } from 'pinia'
import { getUserByEmail } from '@/services/user'
import { ADMIN } from '@/constants/admin'
import { getLocalStorage } from '@/helpers/localStorageHelper'

const authenticationStore = useAuthenticationStore()
const { authenticated } = storeToRefs(authenticationStore)
const route = useRoute()
const adminInfo = ref({
    avatar: '',
    username: '',
    email: '',
})

const getAdminInfo = async () => {
    try {
        adminInfo.value = await getUserByEmail(ADMIN.EMAIL)
    } catch (e) {
        console.log(e)
    }
}

onMounted(async () => {
    await getAdminInfo()
})
</script>

<style scoped>
.left {
    height: calc(100vh - 100px);
    padding: 16px 16px;
    border-right: 1px solid #dcdfe6;
}

.right {
    padding: 0 16px;
    height: calc(100vh - 100px);
    display: flex;
    flex-direction: column;
    position: relative;
}

.title {
    font-size: 24px;
    font-weight: 700;
}

.flex-grow {
    flex-grow: 1;
}

.input-text {
    position: fixed;
    bottom: 16px;
    width: calc(100% - 465px);
    padding: 0 16px;
}

.message-list-item-container {
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 10;
    display: flex;
    justify-content: flex-start;
    background-color: rgba(255, 255, 255, 1);
    padding: 12px 0;
    border-bottom: 1px solid #dcdfe6;
}

.message-list-item {
    display: flex;
    align-items: center;
    cursor: pointer;
    border-radius: 12px;
    background-color: white;
    padding: 8px;
}

.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 16px;
    border: solid 1px gray;
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

    .message-list-item-container {
        height: 60px;
        top: 5px;
    }

    .input-text {
        width: calc(100% * 0.72);
        padding: 0;
    }

    .mobile-title {
        height: 53px;
    }
}
</style>
