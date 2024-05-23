<template>
  首页{{ userStore.permissionList }}
  <router-link to="/login">登录</router-link>
  <button @click="handleLogout">退出登录</button>
</template>

<script setup lang="ts">
import useUserStore from '@/store/user'
import { showSuccessMsg } from '@/utils/message'
const userStore = useUserStore()

function handleLogout() {
  userStore.logout()
  showSuccessMsg('成功退出！')
}
</script>

<style scoped lang="scss"></style>
