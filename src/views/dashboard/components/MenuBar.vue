<template>
  <el-menu router default-active="2" :collapse="isCollapse" class="h-full">
    <MenuBarItem :routerList="userStore.routerList"></MenuBarItem>
  </el-menu>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useUserStore from '@/store/user'
const userStore = useUserStore()

import MenuBarItem from './MenuBarItem.vue'

const isCollapse = ref(false)
</script>

<style scoped lang="scss"></style>
