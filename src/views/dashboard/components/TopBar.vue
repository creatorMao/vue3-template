<template>
  <div class="container flex-end-center p-10">
    <button @click="handleLogout">退出登录</button>
  </div>
</template>

<script setup lang="ts">
import { showSuccessMsg } from '@/utils/message'
import useUserStore from '@/store/user'
const userStore = useUserStore()

function handleLogout() {
  userStore.logout(() => {
    showSuccessMsg('成功退出！')
  })
}
</script>

<style scoped lang="scss">
.container {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  min-height: 50px;
  > * {
    margin-left: 10px;
  }
}
</style>
