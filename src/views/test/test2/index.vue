<template>
  <el-popover
    placement="top-start"
    title="标题"
    width="200"
    trigger="hover"
    content="这是hover 激活。"
  >
    <template #reference>
      <el-button type="warning" plain size="small"
        >下载</el-button
      >
    </template>
  </el-popover>

  <el-popover
    placement="top-start"
    title="标题"
    width="200"
    trigger="hover"
    content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
  >
    <el-button slot="reference">hover 激活</el-button>
  </el-popover>

  <el-tooltip
    class="item"
    effect="dark"
    content="Top Left 提示文字"
    placement="top-start"
  >
    <el-button>上左</el-button>
  </el-tooltip>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss"></style>
