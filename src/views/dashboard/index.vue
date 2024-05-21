<template>首页{{ userStore.userInfo }}</template>

<script setup lang="ts">
import useUserStore from '@/store/user'
const userStore = useUserStore()
</script>

<style scoped lang="scss"></style>
