<script setup lang="ts">

import { onMounted, reactive, ref } from 'vue'
import { ElForm, ElMessage, FormRules } from 'element-plus'
import { createProduct } from '@/services/product'

const props = defineProps<{
    callBack: () => Promise<void>;
}>()

const postForm = ref({
    name: '',
    description: '',
    image: '',
    file: null,
})

const validateImageUrlOrImageFile = (rule: any, value: any, callback: any) => {
    if (!postForm.value.image && !postForm.value.file) {
        callback(new Error('Vui lòng nhập đường dẫn ảnh hoặc chọn ảnh'))
    } else {
        callback()
    }
}

const postFormRef = ref<typeof ElForm | null>(null)
const visible = ref<boolean>(false)
const imageInput = ref<HTMLInputElement | null>(null)
const rules = reactive<FormRules>({
    name: [
        {
            required: true,
            message: 'Vui lòng nhập tên sản phẩm',
            trigger: 'blur',
        },
    ],
    description: [
        {
            required: true,
            message: 'Vui lòng nhập mô tả sản phẩm',
            trigger: 'blur',
        },
    ],
    image: [
        {
            trigger: ['blur', 'change'],
            validator: validateImageUrlOrImageFile,
        },
    ],
    file: [
        {
            trigger: ['blur', 'change'],
            validator: validateImageUrlOrImageFile,
        },
    ],
})
const createLoading = ref<boolean>(false)

const handleCreateProduct = async (data: any) => {
    createLoading.value = true
    try {
        await createProduct(data)
        await props.callBack()
        ElMessage({
            message: 'Thêm thành công',
            type: 'success',
        })
        resetForm(postForm.value)
        visible.value = false
    } catch (e) {
        console.log(e)
        ElMessage({
            message: 'Thêm thất bại',
            type: 'error',
        })
    } finally {
        createLoading.value = false
    }
}

const submitForm = (formEl: typeof ElForm | null) => {
    if (!formEl) return
    formEl.validate(async (valid: any) => {
        if (valid) {
            const formData = new FormData()
            formData.append('name', postForm.value.name)
            formData.append('description', postForm.value.description)
            formData.append('file', postForm.value.file as File)
            formData.append('image', postForm.value.image)
            await handleCreateProduct(formData)
        } else {
            return false
        }
    })
}

const handleChangeImage = () => {
    if (imageInput.value?.files && imageInput.value.files[0]) {
        postForm.value.file = imageInput.value.files[0]
    }
}

const resetForm = (form: any) => {
    form.name = ''
    form.description = ''
    form.file = null
    form.image = ''
}

function openModal() {
    visible.value = true
    resetForm(postForm.value)
}

onMounted(async () => {
})

defineExpose({
    openModal,
})
</script>

<template>
    <el-dialog v-model='visible' title='Tạo sản phẩm mới' width='500' top='8vh' align-center>
        <el-form :model='postForm' label-position='top' ref='postFormRef' :rules='rules'>
            <el-form-item label='Tên sản phẩm:' prop='name'>
                <el-input v-model='postForm.name' placeholder='Nhập tên sản phẩm' type='text' spellcheck='false'
                          clearable />
            </el-form-item>
            <el-form-item label='Mô tả sản phẩm:' prop='description'>
                <el-input v-model='postForm.description' placeholder='Nhập mô tả sản phẩm' type='textarea'
                          spellcheck='false' />
            </el-form-item>
            <el-form-item label='Ảnh minh họa:' prop='image'>
                <el-input v-model='postForm.image' placeholder='Nhập đường dẫn ảnh' :disabled='postForm.file !== null'
                          type='text' spellcheck='false' clearable />
            </el-form-item>
            <div class='or'>Hoặc chọn ảnh từ thiết bị:</div>
            <el-form-item prop='file'>
                <input
                    type='file'
                    class='avatar-input'
                    ref='imageInput'
                    @change='handleChangeImage'
                    :disabled='postForm.image !== ""'
                    title='Chọn ảnh từ thiết bị của bạn'
                />
                <label class="btn-up" for="upload-file">+</label>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class='left-dialog-footer'>
                <el-button @click='resetForm(postForm)'>Thiết lập lại</el-button>
            </span>
            <span class='right-dialog-footer'>
                <el-button @click='visible = false'>Huỷ bỏ</el-button>
                <el-button type='success' :loading='createLoading' @click='submitForm(postFormRef)'>
                    Tạo mới
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