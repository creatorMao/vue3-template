import { ElMessage } from 'element-plus'

export const showSuccessMsg = (message: string) => {
  ElMessage({
    message,
    type: 'success'
  })
}

export const showErrorMsg = (message: string, duration: number = 3 * 1000) => {
  ElMessage({
    message,
    type: 'error',
    duration
  })
}
