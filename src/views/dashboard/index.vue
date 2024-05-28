<template>
  <div class="h-full flex-r">
    <div class="left">
      <MenuBar :routerList="userStore.routerList" />
    </div>
    <div class="right flex-1 flex-c">
      <TopBar />
      <div class="flex-1 p-10">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MenuBar from './components/MenuBar.vue'
import TopBar from './components/TopBar.vue'
import useUserStore from '@/store/user'
const userStore = useUserStore()
</script>

<style scoped lang="scss">
.left {
  width: 230px;
}
</style>
