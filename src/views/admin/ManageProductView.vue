<script setup lang="ts">

import { onMounted, ref } from 'vue'
import { convertDateTime } from '@/helpers/convertDateTime'
import { getProductByPage } from '@/services/product'
import { loadingFullScreen } from '@/utils/loadingFullScreen'
import AddProductModal from '@/components/modals/product/AddProductModal.vue'
import EditProductModal from '@/components/modals/product/EditProductModal.vue'
import DeleteProductModal from '@/components/modals/product/DeleteProductModal.vue'
import FAIcon from '@/components/commons/FAIcon.vue'
import { Search } from '@element-plus/icons-vue'
import { searchProduct } from '@/services/search'

const news = ref<any[]>([])
const totalData = ref<any>(3)
const tableLoading = ref(false)
const searchLoading = ref(false)
const searchName = ref('')

const addProductModal = ref<InstanceType<typeof AddProductModal>>()
const editProductModal = ref<InstanceType<typeof EditProductModal>>()
const deleteProductModal = ref<InstanceType<typeof DeleteProductModal>>()

const loadData = async (page: any) => {
    tableLoading.value = true
    try {
        const res = await getProductByPage(page)
        news.value = res.data
        totalData.value = res.totalData
    } catch (e) {
        console.log(e)
    } finally {
        tableLoading.value = false
    }
}

const handleChangePage = async (val: any) => {
    await loadData(val)
}

const handleSearch = async (page: any, q: any) => {
    tableLoading.value = true
    loadingFullScreen()
    try {
        const res = await searchProduct(page, q)
        news.value = res.data
        totalData.value = res.totalData
    } catch (e) {
        console.log(e)
    } finally {
        tableLoading.value = false
    }
}

onMounted(async () => {
    loadingFullScreen()
    await loadData(1)
})
</script>

<template>
    <div class="manage-news-container">
        <div class="title-page">
            <h1 class="intro-title">Quản lý sản phẩm</h1>
        </div>
        <div class="spacing"></div>
        <div class="content">
            <div class='search'>
                <div class='left'>
                    <el-tooltip effect='dark' content='Thêm sản phẩm' placement='bottom'>
                        <el-button plain type="success" @click='addProductModal?.openModal()'>
                            <FAIcon icon='fa-solid fa-plus' color='' class='icon-margin' />
                        </el-button>
                    </el-tooltip>
                </div>
                <div class='flex-grow'></div>
                <div class='right'>
                    <el-input
                        v-model="searchName"
                        style="max-width: 600px"
                        placeholder="Tìm sản phẩm..."
                        class="input-with-select"
                    >
                        <template #append>
                            <el-button :icon="Search" :loading='searchLoading' @click='handleSearch(1, searchName)' />
                        </template>
                    </el-input>
                </div>
            </div>
            <el-table
                :data='news'
                v-loading='tableLoading'
                :border='true'
                empty-text='Không có sản phẩm nào'
                class='table'
                :default-sort="{ prop: 'id', order: 'ascending' }"
            >
                <el-table-column fixed label='ID' prop='id' width='65' sortable :align="'center'">
                    <template #default='{ row }'>
                        <el-link :href="'/detail-product/' + row.id" type="primary" target="_blank">
                            <el-text truncated type="primary">{{ row.id }}</el-text>
                        </el-link>
                    </template>
                </el-table-column>
                <el-table-column label='Tên' width="150" prop='name' sortable>
                    <template #default='{ row }'>
                        <el-popover placement='bottom' :width='200' trigger='click' :content='row.name'>
                            <template #reference
                            >
                                <el-text truncated> {{ row.name }}</el-text>
                            </template
                            >
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column label='Mô tả sản phẩm' width="200" prop='description'>
                    <template #default='{ row }'>
                        <el-popover placement='bottom' :width='300' trigger='click'>
                            <template #reference>
                                <el-text truncated> {{ row.description }}</el-text>
                            </template>
                            <template #default>
                                <el-text style='max-width: 100%;'>
                                    {{ row.description }}
                                </el-text>
                            </template>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column label='Ảnh minh họa' width="150" prop='image'>
                    <template #default='{ row }'>
                        <el-popover placement='bottom' :show-after='400' :width='300' trigger='hover'>
                            <template #reference>
                                <el-text truncated>
                                    <el-link :href='row.image' target='_blank'>{{ row.image }}</el-link>
                                </el-text>
                            </template>
                            <template #default>
                                <el-image style='max-width: 300px; max-height: 300px;' :src='row.image' alt='Image' />
                            </template>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column label='Người tạo' width="150" prop='createdBy'>
                    <template #default='{ row }'>
                        <el-popover placement='bottom' :width='200' trigger='click' :content='row.createdBy'>
                            <template #reference
                            >
                                <el-text truncated> {{ row.createdBy }}</el-text>
                            </template
                            >
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column label='Người sửa' width="150" prop='updatedBy'>
                    <template #default='{ row }'>
                        <el-popover placement='bottom' :width='200' trigger='click' :content='row.updatedBy'>
                            <template #reference
                            >
                                <el-text truncated> {{ row.updatedBy }}</el-text>
                            </template
                            >
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column label='Ngày tạo' width="150" prop='createdAt' sortable>
                    <template #default='{ row }'>
                        <el-popover placement='bottom' :width='200' trigger='click'
                                    :content='convertDateTime(row.createdAt)'>
                            <template #reference
                            >
                                <el-text truncated> {{ convertDateTime(row.createdAt) }}</el-text>
                            </template
                            >
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column label='Ngày sửa' width="150" prop='updatedAt' sortable>
                    <template #default='{ row }'>
                        <el-popover placement='bottom' :width='200' trigger='click'
                                    :content='convertDateTime(row.updatedAt)'>
                            <template #reference
                            >
                                <el-text truncated> {{ convertDateTime(row.updatedAt) }}</el-text>
                            </template
                            >
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column fixed='right' label='Hành động' width='110' :align="'center'">
                    <template v-slot='scope' #default>
                        <el-tooltip effect='dark' content='Chỉnh sửa tin tức - sự kiện' placement='bottom'>
                            <el-button type='success' size='small' plain @click='editProductModal?.openModal(scope.row)'
                            >
                                <FAIcon color='' icon='fa-regular fa-pen-to-square' />
                            </el-button
                            >
                        </el-tooltip>
                        <el-tooltip effect='dark' content='Xóa tin tức - sự kiện' placement='bottom'>
                            <el-button type='danger' size='small' @click='deleteProductModal?.openModal(scope.row)'
                                       plain>
                                <FAIcon color='' icon='fa-regular fa-trash-can' />
                            </el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>

            <div class='pagination'>
                <el-pagination
                    :page-size='8'
                    layout='prev, pager, next'
                    :total='totalData'
                    @current-change='handleChangePage'
                />
            </div>
        </div>
    </div>
    <AddProductModal ref='addProductModal' :call-back='() => loadData(1)' />
    <EditProductModal ref='editProductModal' :call-back='() => loadData(1)' />
    <DeleteProductModal ref='deleteProductModal' :call-back='() => loadData(1)' />
</template>

<style scoped>
.search {
    display: flex;
    margin-bottom: 20px;
}

.left {
    display: flex;
    float: left;
}

.right {
    display: flex;
    float: right;
}

.flex-grow {
    flex-grow: 1;
}

.title-page {
    background-color: #f4ffed;
    padding: 50px 40px;
    text-align: center;
}

.content {
    width: 75%;
    margin: 0 auto;
    padding-bottom: 50px;
}

.spacing {
    height: 50px;
}

.intro-title {
    font-size: 35px;
    font-weight: 800;
}

.pagination {
    margin-top: 30px;
    float: right;
}

@media only screen and (max-width: 767px) {
    .content {
        width: 95%;
    }
}
</style>