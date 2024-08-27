<template>
  <div>
    <!-- <slot> </slot> -->
    <ContentMenu v-if="contentMenuVisible" ref="contentMenu" />
  </div>
</template>

<script setup lang="ts">
import {
  onBeforeUnmount,
  onMounted,
  provide,
  ref,
  getCurrentInstance,
  ComponentInternalInstance
} from 'vue'
import { Position } from '../types'
import ContentMenu from './ContentMenu.vue'

let isStart = ref(false)
let startPosition: Position
let endPosition: Position
let selectPosition = ref<Position[]>([])
let contentMenuVisible = ref(true)

const { proxy } =
  getCurrentInstance() as ComponentInternalInstance

provide('startSelect', startSelect)
provide('endSelect', endSelect)
provide('duringSelect', duringSelect)
provide('selectPosition', selectPosition)
provide('openContextmenu', openContextmenu)
provide('classNameList', [
  'is_select',
  'single',
  'no_bottom',
  'no_top',
  'no_top_bottom',
  'no_right',
  'no_left',
  'no_left_right',
  'no_right_bottom',
  'no_left_bottom',
  'no_left_right_bottom',
  'no_top_right',
  'no_left_top',
  'no_left_right_top',
  'no_top_right_bottom',
  'no_top_left_bottom',
  'first_column'
])

const emits = defineEmits<{
  (e: 'startSelect', startPosition: Position): void
  (e: 'endSelect', selectPosition: Position[]): void
  (e: 'duringSelect', selectPosition: Position[]): void
  (e: 'copy', selectPosition: Position[]): void
  (e: 'paste', selectPosition: Position[]): void
  (e: 'delete', selectPosition: Position[]): void
}>()

/**
 * 根据开始位置和结束结束位置，得到框选的区域
 */
function getSelectPosition(
  start: Position,
  end: Position
): Position[] {
  let min: Position = {
    rowIndex: Math.min(start.rowIndex, end.rowIndex),
    columnIndex: Math.min(start.columnIndex, end.columnIndex)
  }
  let max: Position = {
    rowIndex: Math.max(start.rowIndex, end.rowIndex),
    columnIndex: Math.max(start.columnIndex, end.columnIndex)
  }

  let positionList: Position[] = []

  for (
    let rowIndex = min.rowIndex;
    rowIndex < max.rowIndex + 1;
    rowIndex++
  ) {
    for (
      let columnIndex = min.columnIndex;
      columnIndex < max.columnIndex + 1;
      columnIndex++
    ) {
      positionList.push({ rowIndex, columnIndex })
    }
  }

  return positionList
}

/**
 * 开始框选
 */
function startSelect(position: Position) {
  isStart.value = true
  contentMenuVisible.value = false
  startPosition = position
  // console.log('开始框选')
  emits('startSelect', startPosition)
}

/**
 * 结束框选
 */
function endSelect(position: Position) {
  isStart.value = false
  endPosition = position
  selectPosition.value = getSelectPosition(
    startPosition,
    endPosition
  )
  // console.log('结束框选')
  emits('endSelect', selectPosition.value)
}

/**
 * 正在框选中
 */
function duringSelect(position: Position) {
  if (isStart.value) {
    selectPosition.value = getSelectPosition(
      startPosition,
      position
    )
    // console.log('正在框选中')
    emits('duringSelect', selectPosition.value)
  }
}

/**
 * 打开右击菜单
 */
function openContextmenu(e: Event) {
  contentMenuVisible.value = true
  // ;(proxy?.$refs.contentMenu as any).show(e)
}

onMounted(() => {
  document.addEventListener('keydown', handleKeyDown)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeyDown)
})

function handleKeyDown(this: Document, ev: KeyboardEvent) {
  if (ev.ctrlKey) {
    if (ev.keyCode === 67 || ev.key === 'c') {
      emits('copy', selectPosition.value)
    }
    if (ev.keyCode === 86 || ev.key === 'v') {
      emits('paste', selectPosition.value)
    }
  }

  if (ev.keyCode === 46 || ev.key === 'Delete') {
    emits('delete', selectPosition.value)
  }
}
</script>

<style scoped lang="scss">
:v-deep(.el-table__row) {
  user-select: none;
}

:v-deep(td:hover) {
  background: initial;
}

:v-deep(.el-table__cell) {
  padding: 0px;
  .cell {
    height: 40px;
    padding: 0px;
    border: transparent 1px solid;
    display: flex;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
  }
  .cell.single {
    border: rgba(19, 133, 240) 1px solid;
  }
  .cell.is_select {
    background: #d0e7fc !important;
  }
  .cell.no_bottom {
    border: rgba(19, 133, 240) 1px solid;
    border-bottom-color: transparent;
  }
  .cell.no_top {
    border: rgba(19, 133, 240) 1px solid;
    border-top-color: transparent;
  }
  .cell.no_top_bottom {
    border: rgba(19, 133, 240) 1px solid;
    border-top-color: transparent;
    border-bottom-color: transparent;
  }
  .cell.no_right {
    border: rgba(19, 133, 240) 1px solid;
    border-right-color: transparent;
  }
  .cell.no_left {
    border: rgba(19, 133, 240) 1px solid;
    border-left-color: transparent;
  }
  .cell.no_left_right {
    border: rgba(19, 133, 240) 1px solid;
    border-left-color: transparent;
    border-right-color: transparent;
  }
  .cell.no_right_bottom {
    border: rgba(19, 133, 240) 1px solid;
    border-right-color: transparent;
    border-bottom-color: transparent;
  }
  .cell.no_left_bottom {
    border: rgba(19, 133, 240) 1px solid;
    border-left-color: transparent;
    border-bottom-color: transparent;
  }
  .cell.no_left_right_bottom {
    border: rgba(19, 133, 240) 1px solid;
    border-left-color: transparent;
    border-right-color: transparent;
    border-bottom-color: transparent;
  }
  .cell.no_top_right {
    border: rgba(19, 133, 240) 1px solid;
    border-top-color: transparent;
    border-right-color: transparent;
  }
  .cell.no_left_top {
    border: rgba(19, 133, 240) 1px solid;
    border-left-color: transparent;
    border-top-color: transparent;
  }
  .cell.no_left_right_top {
    border: rgba(19, 133, 240) 1px solid;
    border-left-color: transparent;
    border-right-color: transparent;
    border-top-color: transparent;
  }
  .cell.no_top_right_bottom {
    border: rgba(19, 133, 240) 1px solid;
    border-bottom-color: transparent;
    border-right-color: transparent;
    border-top-color: transparent;
  }
  .cell.no_top_left_bottom {
    border: rgba(19, 133, 240) 1px solid;
    border-bottom-color: transparent;
    border-left-color: transparent;
    border-top-color: transparent;
  }
  .cell.first_column {
    border-left-width: 2px;
  }
}
</style>
