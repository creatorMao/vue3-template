<template>
  <div class="h-full flex-r">
    <div class="left">
      <MenuBar :routerList="userStore.routerList" />
    </div>
    <div class="right flex-1 flex-c">
      <div class="header">
        <router-link to="/login">登录</router-link>
        <button @click="handleLogout">退出登录</button>
      </div>
      <div class="content flex-1">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MenuBar from './components/MenuBar.vue'
import { showSuccessMsg } from '@/utils/message'
import useUserStore from '@/store/user'
const userStore = useUserStore()

function handleLogout() {
  userStore.logout()
  showSuccessMsg('成功退出！')
}
</script>

<style scoped lang="scss">
.left {
  width: 250px;
  background-color: red;
}
.right {
  background-color: yellow;
}
.header {
  min-height: 60px;
  background-color: #fff;
}
</style>
