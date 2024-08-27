<template>
  <div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import {
  onMounted,
  getCurrentInstance,
  ComponentInternalInstance,
  onBeforeUnmount,
  inject,
  watch
} from 'vue'
import { Position } from '../types'

const { proxy } =
  getCurrentInstance() as ComponentInternalInstance

let tableCellDom: HTMLElement | null

/**
 * scope属性
 */
let { scope } = defineProps<{
  scope: {
    column: { index: number }
    row: { index: number }
  }
}>()

/**
 * 当前单元格的横纵坐标
 */
let position: Position = {
  rowIndex: scope.row.index,
  columnIndex: scope.column.index
}

const startSelect = inject<{
  (position: Position): void
}>('startSelect')

const endSelect = inject<{
  (position: Position): void
}>('endSelect')

const duringSelect = inject<{
  (position: Position): void
}>('duringSelect')

const openContextmenu = inject<{
  (e: MouseEvent, position: Position): void
}>('openContextmenu')

let isSelect = false

const selectPosition = inject<Position[]>('selectPosition', [])

const classNameList = inject<string[]>('classNameList', [])
watch(selectPosition, (newValue) => {
  isSelect = newValue.some((p) => {
    return (
      p.columnIndex === position.columnIndex &&
      p.rowIndex === position.rowIndex
    )
  })

  let className = ['is_select']
  let borderClass = getCellBorderClass(
    newValue,
    position
  ).filter((item) => item)
  className = className.concat(borderClass)

  tableCellDom?.classList.remove(...classNameList)
  if (isSelect) {
    tableCellDom?.classList.add(...className)
  }
})

function getCellBorderClass(
  select: Position[],
  current: Position
): string[] {
  let isSelect = select.some((p) => {
    return (
      p.columnIndex === position.columnIndex &&
      p.rowIndex === position.rowIndex
    )
  })

  let result: string[] = []

  if (isSelect) {
    // console.log(select, current)

    if (
      select.some((p) => {
        return (
          p.columnIndex === position.columnIndex &&
          p.rowIndex === position.rowIndex &&
          p.columnIndex === 0
        )
      })
    ) {
      result.push('first_column')
    }

    //1个
    if (select.length === 1) {
      result.push('single')
    } else {
      let min = select[0]
      let max = select[select.length - 1]

      //竖直框选
      if (min.columnIndex === max.columnIndex) {
        if (min.rowIndex === current.rowIndex) {
          //竖直中的第一个，没有底部边框
          result.push('no_bottom')
        } else if (max.rowIndex === current.rowIndex) {
          //竖直中的最后一个，没有顶部边框
          result.push('no_top')
        } else {
          result.push('no_top_bottom')
        }
      }

      //水平框选
      else if (min.rowIndex === max.rowIndex) {
        if (min.columnIndex === current.columnIndex) {
          //水平中的，最左边
          result.push('no_right')
        } else if (max.columnIndex === current.columnIndex) {
          //水平中的最右边
          result.push('no_left')
        } else {
          result.push('no_left_right')
        }
      }

      //多选
      else if (min.rowIndex === current.rowIndex) {
        if (min.columnIndex === current.columnIndex) {
          result.push('no_right_bottom')
        } else if (max.columnIndex === current.columnIndex) {
          result.push('no_left_bottom')
        } else {
          result.push('no_left_right_bottom')
        }
      } else if (max.rowIndex === current.rowIndex) {
        if (min.columnIndex === current.columnIndex) {
          result.push('no_top_right')
        } else if (max.columnIndex === current.columnIndex) {
          result.push('no_left_top')
        } else {
          result.push('no_left_right_top')
        }
      } else {
        if (min.columnIndex === current.columnIndex) {
          result.push('no_top_right_bottom')
        } else if (max.columnIndex === current.columnIndex) {
          result.push('no_top_left_bottom')
        } else {
          result.push('')
        }
      }
    }
  } else {
    result.push('')
  }

  return result
}

/**
 * 单元格挂载成功后，绑定上相应事件
 */
onMounted(() => {
  tableCellDom = proxy?.$el.parentNode as HTMLElement

  if (tableCellDom) {
    tableCellDom.addEventListener('mousedown', handleMouseDown)
    tableCellDom?.addEventListener('mouseup', handleMouseUp)
    tableCellDom?.addEventListener('mouseover', handleMouseOver)
    tableCellDom?.addEventListener(
      'contextmenu',
      handleContextmenu
    )
  }
})

function handleContextmenu(this: HTMLElement, ev: MouseEvent) {
  //只有有框选区域，才允许右击
  if (isSelect) {
    ev.preventDefault()
    openContextmenu && openContextmenu(ev, position)
  }
}

/**
 * 处理鼠标左键按下事件
 */
function handleMouseDown(e: MouseEvent) {
  if (e.button === 0 && startSelect) {
    startSelect(position)
  }
}
/**
 * 处理鼠标左键抬起事件
 */
function handleMouseUp(e: MouseEvent) {
  if (e.button === 0 && endSelect) {
    endSelect(position)
  }
}

/**
 * 处理鼠标移入事件
 */
function handleMouseOver() {
  if (duringSelect) {
    duringSelect(position)
  }
}

/**
 * 单元格卸载时，移除事件
 */
onBeforeUnmount(() => {
  if (tableCellDom) {
    tableCellDom.removeEventListener(
      'mousedown',
      handleMouseDown
    )
    tableCellDom.removeEventListener('mouseup', handleMouseUp)
    tableCellDom.removeEventListener(
      'mouseover',
      handleMouseOver
    )

    tableCellDom.removeEventListener(
      'contextmenu',
      handleContextmenu
    )
  }

  tableCellDom = null
})
</script>

<style scoped lang="scss"></style>
