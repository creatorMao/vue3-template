<template>
  首页{{ userStore.permissionList }}
  <router-link to="/login">登录</router-link>
</template>

<script setup lang="ts">
import useUserStore from '@/store/user'
const userStore = useUserStore()
</script>

<style scoped lang="scss"></style>
