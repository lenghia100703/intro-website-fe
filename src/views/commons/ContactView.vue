<script setup lang="ts">

import { onMounted, reactive, ref } from 'vue'
import { loadingFullScreen } from '@/utils/loadingFullScreen'
import { GoogleMap, Marker } from 'vue3-google-map'
import ContactCard from '@/components/cards/ContactCard.vue'
import { ElForm, ElMessage, type FormRules } from 'element-plus'
import { useRouter } from 'vue-router'
import { ADMIN } from '@/constants/admin'
import { getLocalStorage, putLocalStorage, removeLocalStorage } from '@/helpers/localStorageHelper'
import { sendMessage } from '@/services/message'

const router = useRouter()
const submitLoading = ref<boolean>(false)
const contactForm = ref({
    username: '',
    email: '',
    content: '',
})
const rules = reactive<FormRules<any>>({
    email: [
        {
            required: true,
            message: 'Vui lòng nhập email',
            trigger: 'blur',
        },
        {
            type: 'email',
            message: 'Vui lòng nhập đúng email',
            trigger: ['blur', 'change'],
        },
    ],
    username: [
        {
            required: true,
            message: 'Vui lòng nhập họ tên',
            trigger: 'blur',
        },
    ],
    content: [
        {
            required: true,
            message: 'Vui lòng nhập nội dung',
            trigger: 'blur',
        },
    ],
})
const contactFormRef = ref<typeof ElForm | null>(null)

const center = { lat: 20.8378657, lng: 105.3430343 }

const contact = [
    {
        title: 'Địa chỉ',
        description: 'Số 73, Đại lộ Thịnh Lang, Phường Thịnh Lang, TP. Hòa Bình, Tỉnh Hòa Bình',
        icon: 'fa-regular fa-map',
    },
    {
        title: 'Số điện thoại',
        description: '084 688 1815 – 091 394 5746',
        icon: 'fa-solid fa-phone',
    },
    {
        title: 'Địa chỉ Email',
        description: 'baobianquycuong@gmail.com',
        icon: 'fa-regular fa-envelope',
    },
]

const handleSendMessage = async (data: any) => {
    submitLoading.value = true
    const senderStorage = getLocalStorage('sender')
    if (senderStorage !== data.sender) {
        removeLocalStorage('sender')
        putLocalStorage('sender', data.sender)
    }
    try {
        await sendMessage(data)
        putLocalStorage('sender', data.sender)
        await router.push('/messages/t/' + ADMIN.EMAIL)
    } catch (e) {
        console.log(e)
        ElMessage.error(
            e.response?.data?.data
                ? e.response?.data?.data
                : 'Có lỗi xảy ra trong khi gửi. Vui lòng thử lại!',
        )
    } finally {
        submitLoading.value = false
    }
}

const submitForm = (formEl: typeof ElForm | null) => {
    if (!formEl) return
    formEl.validate(async (valid: any) => {
        if (valid) {
            await handleSendMessage({
                usernameSender: contactForm.value.username,
                sender: contactForm.value.email,
                content: contactForm.value.content,
                receiver: ADMIN.EMAIL,
                usernameReceiver: ADMIN.USERNAME,
            })
        } else {
            return false
        }
    })
}

onMounted(() => {

    loadingFullScreen()

})
</script>

<template>
    <div class="contact">
        <div class="title-page">
            <h1 class="contact-title">Liên hệ</h1>
        </div>
        <div class="spacing"></div>
        <div class="content">
            <div>
                <el-button style="background-color: #f0f9eb; color: #67c23a" type="success" round plain>Liên hệ với
                    chúng tôi
                </el-button>
            </div>
            <br />
            <el-row justify="space-between">
                <el-col :xs='24' :sm='16' :md='14' :lg='11' :span="11">
                    <div class="product-title">Hãy liên hệ và tìm hiểu thêm về chúng tôi</div>
                </el-col>
            </el-row>
            <br />
            <el-row justify="space-between">
                <el-col :xs='24' :sm='16' :md='14' :lg='11' :span="11" class="mobile-margin-bottom-css">
                    <el-form :hide-required-asterisk="true" label-position='top' :model='contactForm' :rules='rules'
                             ref='contactFormRef'>
                        <el-form-item label='Họ tên' prop='username'>
                            <el-input v-model='contactForm.username' type='text' clearable />
                        </el-form-item>
                        <el-form-item label='Email' prop='email'>
                            <el-input v-model='contactForm.email' type='text' clearable />
                        </el-form-item>
                        <el-form-item label='Nội dung' prop='content'>
                            <el-input v-model='contactForm.content' type='textarea' />
                        </el-form-item>
                        <el-form-item>
                            <div class='action'>
                                <el-button
                                    class='btn-submit'
                                    size="large"
                                    :loading='submitLoading'
                                    type='success'
                                    @click='submitForm(contactFormRef)'
                                    @keyup.enter='submitForm(contactFormRef)'
                                    native-type='submit'
                                >
                                    Gửi
                                </el-button>
                            </div>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :xs='24' :sm='16' :md='14' :lg='11' :span="11">
                    <div>
                        <el-text size="large" tag="b">Công ty Cổ phần Đầu tư và Thương mại An Quý Cường</el-text>
                    </div>
                    <br />
                    <div>
                        <el-text size="large" tag="b">Địa chỉ liên hệ:</el-text>
                        <el-text size="large">Số 73, Đại lộ Thịnh Lang, Phường Thịnh Lang, TP. Hòa Bình, Tỉnh Hòa Bình
                        </el-text>
                    </div>
                    <br />
                    <div>
                        <el-text size="large" tag="b">
                            Số giấy chứng nhận đăng ký kinh doanh:
                        </el-text>
                        <el-text size="large">5400312309 cấp ngày 07/04/2009 tại Chi cục Thuế khu vực Hòa Bình - Đà
                            Bắc
                        </el-text>
                    </div>
                    <br />
                    <div>
                        <el-text size="large" tag="b">Email:</el-text>
                        <el-text size="large" type="primary">baobianquycuong@gmail.com</el-text>
                    </div>
                    <br />
                    <div>
                        <el-text size="large" tag="b">Hotline:</el-text>
                        <el-text size="large" type="primary">084 688 1815 – 091 394 5746</el-text>
                    </div>
                </el-col>
            </el-row>
            <br />
            <br />
            <br />
            <el-row justify="center" gutter="50">
                <el-col class="mobile-margin-bottom-css" :xs='24' :sm='7' :md='7' :lg='7' :span="7"
                        v-for="item in contact">
                    <ContactCard :title="item.title" :description="item.description" :icon="item.icon" />
                </el-col>
            </el-row>
            <br />
            <br />
            <br />
            <el-row>
                <el-col>
                    <GoogleMap
                        api-key="AIzaSyAAW4kIQfRSxfpKQaysriN2G766CvY5Kbw"
                        style="width: 100%; height: 400px"
                        :center="center"
                        :zoom="16"
                    >
                        <Marker :options="{ position: center }" />
                    </GoogleMap>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<style scoped>
.contact {
    margin: 0 auto;
}

.title-page {
    background-color: #f4ffed;
    padding: 50px 40px;
    text-align: center;
}

.contact-title {
    font-size: 35px;
    font-weight: 800;
}

.spacing {
    height: 50px;
}

.content {
    width: 75%;
    margin: 0 auto;
}

.product-title {
    font-size: 30px;
    font-weight: 800;
}

@media only screen and (max-width: 767px) {
    .content {
        width: 85%;
    }

    .mobile-margin-bottom-css {
        margin-bottom: 30px;
    }

    .action {
        width: 100%;
    }

    .btn-submit {
        width: 100%;
    }
}
</style>