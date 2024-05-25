<template>
  <template v-for="item in routerList" :key="item.path">
    <el-sub-menu
      v-if="item.children && item.children.length > 0"
      :index="item.path"
    >
      <template #title>
        <el-icon v-if="item.icon">
          <component :is="item.icon" />
        </el-icon>
        <span>{{ item.title }}</span>
      </template>
      <MenuBarItem :routerList="item.children" />
    </el-sub-menu>
    <el-menu-item v-else :index="item.path">
      <el-icon v-if="item.icon">
        <component :is="item.icon" />
      </el-icon>
      {{ item.title }}
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">
import { type IRouter } from '@/types/user'

defineProps<{
  routerList: IRouter[]
}>()
</script>

<style scoped lang="scss"></style>
