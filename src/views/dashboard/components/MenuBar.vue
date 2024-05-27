<template>
  <el-menu
    router
    :default-active="defaultActive"
    :collapse="false"
    class="h-full"
    ref="menuRef"
  >
    <MenuBarItem :routerList="routerList"></MenuBarItem>
  </el-menu>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import MenuBarItem from './MenuBarItem.vue'
import { type IRouter } from '@/types/user'
import { router } from '@/router/index'

const { routerList } = defineProps<{
  routerList: IRouter[]
}>()

const defaultActive = computed(() => {
  if (routerList.length > 0) {
    if (routerList[0].children.length > 0) {
      return routerList[0].children[0].children[0].path //todo 改成递归取第一个
    }
  }
  return ''
})

onMounted(() => {
  router.push({ path: defaultActive.value })
})
</script>

<style scoped lang="scss"></style>
