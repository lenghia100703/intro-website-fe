<script setup lang='ts'>

import { PATHS } from '@/router/paths'
import FAIcon from '@/components/commons/FAIcon.vue'
import { useAuthenticationStore } from '@/stores/useAuthenticationStore'
import { computed } from 'vue'

const authenticationStore = useAuthenticationStore()

authenticationStore.loadFromServer()

const isOwner = computed(() => (authenticationStore.role.toString() === 'OWNER'))

</script>

<template>
    <el-menu-item :route='PATHS.HOME' :index='PATHS.HOME'>
        <template #title>
            <FAIcon icon='fa-solid fa-home' class='icon' color="" />
            Trang chủ
        </template>
    </el-menu-item>
</template>

<style scoped>
.icon {
    margin-right: 8px;
}
</style>