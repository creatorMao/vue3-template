<template>
    <div class="container">
        <router-link to="/test1">go to test1</router-link>
        <router-link to="/test2">go to test2</router-link>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang='scss'>
.container {
    .content {
        width: 100px;
        height: 100px;
        border: 1px solid red;
    }
}
</style>
