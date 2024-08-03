<template>
    <div class="message-detail-container">
        <div class="message-list" ref="messageList">
            <div
                v-for="message in privateChats.get(receiver)"
                :key="message.id"
                :class="['message-item', { 'mine': message.sender === props.sender }]"
            >
                <div v-if="message.sender === props.sender" class="message-content-mine">
                    <div class="message-text">{{ message.content }}</div>
                    <img :src="senderInfo.avatar" alt="avatar"
                         class="avatar" />
                </div>
                <div v-else class="message-content-other">
                    <img :src="receiverInfo.avatar" alt="avatar" class="avatar" />
                    <div class="message-text">{{ message.content }}</div>
                </div>
            </div>
        </div>
        <div class="message-input-container">
            <el-input
                v-model="message"
                placeholder="Aa"
                class="message-input"
                @keyup.enter="sendPrivateMessage"
                spellcheck="false"
                clearable
            ></el-input>
            <el-button type="success" plain @click="sendPrivateMessage">
                <FAIcon icon="fa-solid fa-paper-plane" color="" />
            </el-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, ref, watch } from 'vue'
import FAIcon from '@/components/commons/FAIcon.vue'
import { getMessages } from '@/services/message'
import { useRoute } from 'vue-router'
import { getLocalStorage } from '@/helpers/localStorageHelper'
import { WEBSOCKET } from '@/constants/websocket'
import { Stomp } from '@stomp/stompjs'
import { getUserByEmail } from '@/services/user'
import { ADMIN } from '@/constants/admin'

const props = withDefaults(
    defineProps<{
        sender?: string
        receiver?: string
    }>(),
    {
        sender: getLocalStorage('sender') ? getLocalStorage('sender') : '',
        receiver: ADMIN.EMAIL,
    },
)
const stompClient = ref(null)
const route = useRoute()
const privateChats = ref(new Map())
const message = ref('')
const messageList = ref<HTMLDivElement | null>(null)
const senderInfo = ref({
    username: '',
    email: '',
    avatar: '',
})
const receiverInfo = ref({
    username: '',
    email: '',
    avatar: '',
})
const usernameSender = ref('')
const usernameReceiver = ref('')

const scrollToBottom = () => {
    if (messageList.value) {
        messageList.value.scrollTop = messageList.value.scrollHeight
    }
}

const connect = () => {
    const websocket = new WebSocket(import.meta.env.VITE_APP_ROOT_WS + WEBSOCKET.ENDPOINT)
    stompClient.value = Stomp.over(websocket)
    stompClient.value.connect({}, onConnected, onError)
}

const onConnected = () => {
    stompClient.value.subscribe(WEBSOCKET.SUBSCRIBE(props.sender), onPrivateMessage)
}

const onError = (err: any) => {
    console.log(err)
}

const onPrivateMessage = (payload: any) => {
    const payloadData = JSON.parse(payload.body)
    if (privateChats.value.get(payloadData.sender)) {
        privateChats.value.get(payloadData.sender).push(payloadData)
    } else {
        let list = []
        list.push(payloadData)
        privateChats.value.set(payloadData.sender, list)
    }
}

const getSenderAndReceiverInfo = async () => {
    try {
        senderInfo.value = await getUserByEmail(props.sender)
        receiverInfo.value = await getUserByEmail(props.receiver)
        usernameSender.value = senderInfo.value.username
        usernameReceiver.value = receiverInfo.value.username
    } catch (e) {
        console.log(e)
    }
}

const sendPrivateMessage = async () => {
    if (message.value.trim() !== '') {
        const payload = {
            usernameSender: usernameSender.value,
            usernameReceiver: usernameReceiver.value,
            sender: props.sender,
            receiver: props.receiver,
            content: message.value,
        }


        privateChats.value.get(props.receiver).push(payload)
        stompClient.value.send(WEBSOCKET.PUBLISH, {}, JSON.stringify(payload))
        message.value = ''
        await nextTick(scrollToBottom)
    }
}

const loadMessages = async () => {
    try {
        const msgs = await getMessages(props.sender, props.receiver)
        privateChats.value.set(props.receiver, msgs)
        await nextTick(scrollToBottom)
    } catch (e) {
        console.log(e)
    }
}

watch(
    () => route.params.email,
    async () => {
        await loadMessages()
    },
)

onMounted(async () => {
    connect()
    await getSenderAndReceiverInfo()
    await loadMessages()
})
</script>

<style scoped>
.message-detail-container {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 150px)
}

.message-list {
    flex-grow: 1;
    overflow-y: auto;
    padding: 16px;
}

.message-item {
    display: flex;
    align-items: flex-start;
    margin-bottom: 16px;
}

.message-item.mine {
    justify-content: flex-end;
}

.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: solid 1px gray;
}

.message-content-other {
    display: flex;
    align-items: center;
}

.message-content-mine {
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

.message-content-other .avatar {
    margin-right: 16px;
}

.message-content-mine .avatar {
    margin-left: 16px;
    margin-right: 0;
}

.message-content-other .message-text {
    background-color: var(--el-color-success);
}

.message-content-mine .message-text {
    background-color: var(--el-color-success);
}

.message-text {
    max-width: 70%;
    border-radius: 12px;
    padding: 10px;
    color: #fff;
}

.message-input-container {
    display: flex;
    align-items: center;
    padding: 8px 12px;
    border: 1px solid var(--el-color-success);
    border-radius: 12px;
}

.message-input {
    flex-grow: 1;
    margin: 0 8px;
    background-color: #2c2c2e;
    border-radius: 20px;
    color: #fff;
}

@media only screen and (max-width: 767px) {
    .message-list {
        padding: 20px 6px;
    }

    .message-input-container {
        padding: 6px;
        margin-left: -7px;
    }
}
</style>
