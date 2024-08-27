<template>
  <SelectionTableContainer
    @startSelect="handleStartSelect"
    @endSelect="handleEndSelect"
    @duringSelect="handleDuringSelect"
    @copy="handleCopy"
    @paste="handlePaste"
    @delete="handleDelete"
  >
    <el-table
      :data="tableData"
      :highlight-hover="false"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="date"
        label="日期"
        width="180"
        :index="0"
      >
        <template #default="scope">
          <SelectionTableContent :scope="scope">
            {{ scope.row.date }}
          </SelectionTableContent>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180"
        :index="1"
      >
        <template #default="scope">
          <SelectionTableContent :scope="scope">
            {{ scope.row.name }}
          </SelectionTableContent>
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="地址1"
        :index="2"
      >
        <template #default="scope">
          <SelectionTableContent :scope="scope">
            {{ scope.row.address }}
          </SelectionTableContent>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="地址" :index="3">
        <template #default="scope">
          <SelectionTableContent :scope="scope">
            {{ scope.row.address }}
          </SelectionTableContent>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="地址" :index="4">
        <template #default="scope">
          <SelectionTableContent :scope="scope">
            {{ scope.row.address }}
          </SelectionTableContent>
        </template>
      </el-table-column>
    </el-table>
  </SelectionTableContainer>
</template>

<script setup lang="ts">
import {
  SelectionTableContainer,
  SelectionTableContent
} from '@/components/SelectionTable'
import { Position } from '@/components/SelectionTable/types'
import { ref } from 'vue'

const tableData = ref([
  {
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄',
    index: 0
  },
  {
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1517 弄',
    index: 1
  },
  {
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1519 弄',
    index: 2
  },
  {
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1516 弄',
    index: 3
  }
])

function handleStartSelect(startPosition: Position) {
  console.log(`开始框选,起始位置：`, startPosition)
}

function handleEndSelect(selectPosition: Position[]) {
  console.log(`结束框选，框选范围：`, selectPosition)
}

function handleDuringSelect(selectPosition: Position[]) {
  // console.log(`正在框选，框选范围：`, selectPosition)
}

function handleCopy(selectPosition: Position[]) {
  console.log('键盘复制', selectPosition)
}
function handlePaste(selectPosition: Position[]) {
  console.log('键盘粘贴', selectPosition)
}
function handleDelete(selectPosition: Position[]) {
  console.log('键盘删除', selectPosition)
}
</script>

<style scoped lang="scss"></style>
