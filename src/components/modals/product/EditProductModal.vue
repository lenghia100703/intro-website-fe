<script setup lang='ts'>

import { reactive, ref } from 'vue'
import { ElForm, ElMessage, FormRules } from 'element-plus'
import { editProduct } from '@/services/product'

const props = defineProps<{
    callBack: () => Promise<void>;
}>()

const visible = ref<boolean>(false)
const productId = ref()
const defaultData = ref<any>()
const editFormRef = ref<typeof ElForm | null>(null)
const editForm = ref({
    name: '',
    description: '',
    file: null,
    image: '',
})

const rules = reactive<FormRules>({
    name: [
        {
            required: true,
            message: 'Vui lòng nhập tiêu đề',
            trigger: 'blur',
        },
    ],
    description: [
        {
            required: true,
            message: 'Vui lòng nhập nội dung',
            trigger: 'blur',
        },
    ],
})
const editLoading = ref<boolean>(false)
const imageInput = ref<HTMLInputElement | null>(null)

const handleChangeImage = () => {
    if (imageInput.value?.files && imageInput.value.files[0]) {
        editForm.value.file = imageInput.value.files[0]
    }
}

const handleEditProduct = async (data: any) => {
    editLoading.value = true
    try {
        await editProduct(productId.value, data)
        await props.callBack()
        ElMessage({
            message: 'Sửa thành công',
            type: 'success',
        })
        resetForm(editForm.value)
        visible.value = false
    } catch (e) {
        console.log(e)
        ElMessage({
            message: 'Sửa thất bại',
            type: 'error',
        })
    } finally {
        editLoading.value = false
    }
}

const submitForm = (formEl: typeof ElForm | null) => {
    if (!formEl) return
    formEl.validate(async (valid: any) => {
        if (valid) {
            const formData = new FormData()
            formData.append('name', editForm.value.name)
            formData.append('description', editForm.value.description)
            formData.append('file', editForm.value.file)
            formData.append('image', editForm.value.image)
            await handleEditProduct(formData)
        } else {
            return false
        }
    })
}

const resetForm = (form: any) => {
    form.name = ''
    form.description = ''
    form.file = null
    form.image = ''
}

const resetToDefault = (form: any) => {
    form.file = null
    form.name = defaultData.value.name
    form.description = defaultData.value.description
    form.image = defaultData.value.image
}

const openModal = (data: any) => {
    visible.value = true
    productId.value = data.id
    editForm.value.name = data.name
    editForm.value.description = data.description
    editForm.value.image = data.image
    defaultData.value = data
}

defineExpose({
    openModal,
})
</script>

<template>
    <el-dialog v-model='visible' title='Sửa tin tức - sự kiện' width='500' top='8vh' align-center>
        <el-form :model='editForm' label-position='top' ref='editFormRef' :rules='rules'>
            <el-form-item label='Tiêu đề:' prop='name'>
                <el-input v-model='editForm.name' type='text' spellcheck='false' clearable />
            </el-form-item>
            <el-form-item label='Nội dung:' prop='description'>
                <el-input v-model='editForm.description' type='textarea' spellcheck='false' />
            </el-form-item>
            <el-form-item label='Ảnh minh họa:' prop='image'>
                <el-input v-model='editForm.image' placeholder='Nhập đường dẫn ảnh'
                          :disabled='editForm.file !== null' type='text' spellcheck='false' clearable />
            </el-form-item>
            <div class='or'>Hoặc chọn ảnh từ thiết bị:</div>
            <el-form-item prop='image'>
                <input
                    type='file'
                    class='avatar-input'
                    ref='imageInput'
                    @change='handleChangeImage'
                    :disabled='editForm.image !== ""'
                    title='Chọn ảnh từ thiết bị của bạn'
                />
                <label class='btn-up' for='upload-file'>+</label>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class='left-dialog-footer'>
                <el-button @click='resetToDefault(editForm)'>Thiết lập lại</el-button>
            </span>
            <span class='right-dialog-footer'>
                <el-button @click='visible = false'>Huỷ bỏ</el-button>
                <el-button type='success' :loading='editLoading' @click='submitForm(editFormRef)'>
                    Sửa
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