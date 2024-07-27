<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElForm, ElMessage, FormRules } from 'element-plus'
import { saveMessage } from '@/services/message'
import { ADMIN } from '@/constants/admin'
import { useRouter } from 'vue-router'

const contactFormRef = ref<typeof ElForm | null>(null)
const visible = ref<boolean>(false)
const router = useRouter()
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
const createLoading = ref<boolean>(false)

const handleSendMessage = async (data: any) => {
    try {
        createLoading.value = true
        await saveMessage(data)
        await router.push('/messages/t/' + ADMIN.EMAIL)
    } catch (e) {
        console.log(e)
        ElMessage.error(
            e.response?.data?.data
                ? e.response?.data?.data
                : 'Có lỗi xảy ra trong khi gửi. Vui lòng thử lại!',
        )
    } finally {
        createLoading.value = false
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

const resetForm = (form: any) => {
    form.username = ''
    form.content = ''
    form.email = ''
}

function openModal() {
    visible.value = true
    resetForm(contactForm.value)
}

defineExpose({
    openModal,
})
</script>

<template>
    <el-dialog v-model='visible' title="Liên hệ với Quản lý" width='500' top='8vh' align-center>
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
        </el-form>
        <template #footer>
            <span class='left-dialog-footer'>
                <el-button @click='resetForm(contactForm)'>Thiết lập lại</el-button>
            </span>
            <span class='right-dialog-footer'>
                <el-button @click='visible = false'>Huỷ bỏ</el-button>
                <el-button
                    class='btn-submit'
                    :loading='createLoading'
                    type='success'
                    @click='submitForm(contactFormRef)'
                >
                    Gửi
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<style scoped>
.left-dialog-footer {
    float: left;
}

.or {
    width: 100%;
    margin-bottom: 8px;
}

.left-dialog-footer {
    float: left;
}

label {
    padding: 32px 43px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    cursor: pointer;
    background-color: white;
    color: #8c939d;
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    position: absolute;
    z-index: 2;
}

.avatar-input {
    opacity: 0;
    width: 100px;
    height: 100px;
    z-index: 10;
    cursor: pointer;
}

.avatar-input:hover ~ .btn-up {
    border-color: var(--el-color-primary);
    color: var(--el-color-primary);
}
</style>