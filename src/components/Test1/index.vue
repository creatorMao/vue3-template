<template>
    <div>
        <el-button type="primary">Primary</el-button>
        <el-button :icon="Search" circle />
        {{ countStore.sum }}
    </div>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'

import { useCountStore } from '@/store/count'

import { getCurrentInstance } from 'vue';
const { proxy } = getCurrentInstance() as any

const countStore = useCountStore()
proxy.$http.get("/config/constGroup/get");
</script>

<style lang="scss"></style>