<template>
    <el-row>
        <el-col :span="6" class="left">
            <div class="mobile-title" style="display: flex; align-items: center;">
                <div class="title">Đoạn chat</div>
                <div class="flex-grow"></div>
                <div class='hidden-sm-and-down'>
                    <el-button size="large" type="info" :icon="Edit" circle plain />
                </div>
            </div>
            <el-divider />
            <MessageList v-for="receiver in receivers"
                         :class="[{ 'isSelected': email === receiver.email }]"
                         :key="receiver.id"
                         :username="receiver.username"
                         :email="receiver.email"
                         :avatar="receiver.avatar"
                         @select="handleSelect"
            />
        </el-col>

        <el-col :span="18" class="right">
            <div class="message-list-item-container">
                <div class="message-detail-item">
                    <img
                        class="avatar"
                        :src="userInfo?.avatar"
                        alt="avatar"
                    />
                    <el-row>
                        <el-col>
                            <el-text tag="b">{{ userInfo?.username }}</el-text>
                        </el-col>
                    </el-row>
                </div>
                <div class="flex-grow"></div>
                <div class="menu-box-chat">
                    <el-popover :visible="visible" placement="top" :width="160">
                        <p>Bạn có muốn xóa đoạn chat này?</p>
                        <div style="text-align: right; margin: 0">
                            <el-button size="small" text @click="visible = false">Hủy</el-button>
                            <el-button size="small" type="primary" @click="deleteMessage">
                                OK
                            </el-button>
                        </div>
                        <template #reference>
                            <div class="menu-box-chat-inner" @click="visible = !visible">
                                <FAIcon icon="fa-solid fa-circle-info" color="#409EFFFF" size="large" />
                            </div>
                        </template>
                    </el-popover>
                </div>
            </div>
            <el-divider />
            <MessageDetail :sender="ADMIN.EMAIL" :receiver="email" class="input-text" />
        </el-col>
    </el-row>
</template>

<script lang="ts" setup>

import { Edit } from '@element-plus/icons-vue'
import MessageList from '@/components/commons/MessageList.vue'
import { onMounted, ref, watch } from 'vue'
import { deleteMessageWithEmail, getMessagesBySender } from '@/services/message'
import { ADMIN } from '@/constants/admin'
import MessageDetail from '@/components/commons/MessageDetail.vue'
import { useRoute, useRouter } from 'vue-router'
import { getUserByEmail } from '@/services/user'
import FAIcon from '@/components/commons/FAIcon.vue'
import { ElMessage } from 'element-plus'
import { PATHS } from '@/router/paths'

const visible = ref(false)
const receivers = ref([])
const route = useRoute()
const router = useRouter()
const email = ref<string>(route.params.email.toString())
const userInfo = ref({
    avatar: '',
    username: '',
    email: '',
})

const loadListReceiver = async () => {
    try {
        receivers.value = await getMessagesBySender(ADMIN.EMAIL)
    } catch (e) {
        console.log(e)
    }
}

const getSenderAndReceiverInfo = async () => {
    try {
        userInfo.value = await getUserByEmail(email.value)
    } catch (e) {
        console.log(e)
    }
}

const handleSelect = (data: any) => {
    userInfo.value = {
        avatar: data[2],
        username: data[1],
        email: data[0],
    }
}

const deleteMessage = async () => {
    try {
        await deleteMessageWithEmail(userInfo.value?.email)
        await router.push(PATHS.MANAGE_MESSAGE)
        ElMessage({
            type: 'success',
            message: 'Xóa tin nhắn thành công'
        })
    } catch (e) {
        console.log(e)
        ElMessage({
            type: 'error',
            message: 'Xóa tin nhắn lỗi. Vui lòng thử lại'
        })
    } finally {
        visible.value = false
    }
}

watch(
    () => route.params.email,
    () => {
        email.value = route.params.email.toString()
    },
)

onMounted(async () => {
    await getSenderAndReceiverInfo()
    await loadListReceiver()
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
    width: 100%;
}

.title {
    font-size: 24px;
    font-weight: 700;
}

.flex-grow {
    flex-grow: 1;
}

.isSelected {
    background-color: #f0f1f4;
}

.menu-box-chat {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    cursor: pointer;
    margin-right: 18px;
}

.menu-box-chat-inner {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    padding: 8px;
    text-align: center;
}

.menu-box-chat-inner:hover {
    background-color: #f0f1f4;
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

.flex-grow {
    flex-grow: 1;
}

.message-detail-item {
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
