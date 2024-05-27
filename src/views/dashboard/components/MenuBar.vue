<template>
  <el-menu router default-active="2" :collapse="false" class="h-full">
    <MenuBarItem :routerList="routerList"></MenuBarItem>
  </el-menu>
</template>

<script setup lang="ts">
import MenuBarItem from './MenuBarItem.vue'
import { type IRouter } from '@/types/user'

defineProps<{
  routerList: IRouter[]
}>()
</script>

<style scoped lang="scss"></style>
