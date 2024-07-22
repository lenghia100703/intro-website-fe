<script setup lang='ts'>

import { ref } from 'vue'
import { deleteProduct } from '@/services/product'
import { ElMessage } from 'element-plus'

const props = defineProps<{
    callBack: () => Promise<void>;
}>()

const visible = ref(false)
const deleteLoading = ref(false)
const productId = ref()

const handleDeleteProduct = async () => {
    deleteLoading.value = true
    try {
        await deleteProduct(productId.value)
        await props.callBack()
        ElMessage({
            message: 'Xóa thành công',
            type: 'success',
        })
        visible.value = false
    } catch (e) {
        console.log(e)
        ElMessage({
            message: 'Xóa thất bại',
            type: 'error',
        })
    } finally {
        deleteLoading.value = false
    }
}

const openModal = (data: any) => {
    visible.value = true
    productId.value = data.id
}

defineExpose({
    openModal,
})
</script>

<template>
    <el-dialog v-model='visible' title='Xóa tin tức - sự kiện' width='500' top='25vh' align-center>
        <span> Bạn có muốn xóa tin tức - sự kiện có
            <el-text type='danger' class='product-id'> ID = {{ productId }} </el-text>
            không ?
        </span>
        <template #footer>
            <span class='dialog-footer'>
                <el-button @click='visible = false'>Hủy</el-button>
                <el-button type='danger' :loading='deleteLoading' @click='handleDeleteProduct'> Xóa </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<style scoped>

</style>