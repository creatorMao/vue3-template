<template>
  <div class="h-full bg-color-primary flex-center-center">
    <div class="container bg-color-white flex-c-center-center">
      <div>登录</div>
      <div class="m-t-20 login-box">
        <el-form ref="loginFormRef" :rules="rules" :model="loginForm">
          <el-form-item prop="userName">
            <el-input
              v-model="loginForm.userName"
              prefix-icon="User"
              placeholder="请输入账号"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              prefix-icon="Lock"
              placeholder="请输入密码"
              show-password
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" class="w-full" @click="handleLogin"
          >登录</el-button
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance() as any
import { login } from '@/api/user'

const loginForm = reactive({
  userName: '',
  password: ''
})

const rules = {
  userName: [
    {
      required: true,
      trigger: 'change',
      message: '请输入用户名！'
    }
  ],
  password: [
    {
      required: true,
      trigger: 'change',
      validator: validatePassword
    }
  ]
}

function validatePassword(_rule: any, value: any, callback: any) {
  if (!value || value.length < 6) {
    callback(new Error('密码最少6位'))
  } else {
    callback()
  }
}

function handleLogin() {
  proxy.$refs.loginFormRef.validate((result: any) => {
    if (result) {
      login({}).then((res) => {
        console.log(res)
      })
    }
  })
}
</script>

<style scoped lang="scss">
.container {
  width: 500px;
  height: 400px;
  border-radius: 5px;

  .login-box {
    width: 240px;
  }
}
</style>
