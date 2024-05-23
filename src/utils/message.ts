import { ElMessage } from 'element-plus'

export function showSuccessMsg(message: string) {
  ElMessage({
    message,
    type: 'success'
  })
}

export function showErrorMsg(message: string, duration: number = 1.5 * 1000) {
  ElMessage({
    message,
    type: 'error',
    duration
  })
}
