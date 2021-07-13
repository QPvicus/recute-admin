<!--
 * @Author: Taylor Swift
 * @Date: 2021-06-05 13:04:01
 * @LastEditTime: 2021-07-12 16:16:57
 * @Description:
-->

<template>
  <div class="login-container">
    <div class="relative mt-15 ml-28 login-box">
      <h3 class="text-xl font-medium text-center">大学生招聘后台管理系统</h3>
      <a-form
        class="p-4 mt-4"
        :model="formData"
        :rules="getFormRules"
        ref="formRef"
        @keypress.enter="handleLogin"
      >
        <a-form-item name="username">
          <a-input
            size="large"
            v-model:value="formData.username"
            placeholder="请输入用户名"
          >
            <template #prefix>
              <UserOutlined />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item name="password">
          <a-input-password
            size="large"
            visibilityToggle
            v-model:value="formData.password"
            placeholder="请输入密码"
          >
            <template #prefix>
              <LockOutlined />
            </template>
          </a-input-password>
        </a-form-item>
        <a-form-item>
          <a-button
            type="primary"
            size="large"
            block
            @click="handleLogin"
            :loading="loading"
          >
            登录
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useFormRules, useFormValid } from './useLogin'
import { useRoute, useRouter } from 'vue-router'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { useUserStore } from '/@/store/modules/user'
import { login } from '/@/api/user'

export default defineComponent({
  name: 'LoginForm',
  components: {
    UserOutlined,
    LockOutlined,
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const formRef = ref()
    const formData = reactive({
      username: 'admin',
      password: 'admin',
    })
    const loading = ref(false)
    const userStore = useUserStore()
    const { getFormRules } = useFormRules()
    const { validForm } = useFormValid(formRef)
    async function handleLogin() {
      const user = await validForm()
      console.log(user, 'user')
      if (!user) return
      try {
        loading.value = true
        const { data } = await login(user)
        console.log(data)
        userStore.setToken(data.message.token)
        const path = decodeURIComponent(
          (route.query?.redirect || '/') as string
        )
        router.push(path)
      } catch (error) {
        console.log(error)
      } finally {
        loading.value = false
      }
    }
    return {
      getFormRules,
      formData,
      formRef,
      handleLogin,
      loading,
    }
  },
})
</script>

<style lang="less" scoped>
.login-container {
  height: 100vh;
  overflow: hidden;
  background: url('/@/assets/bg.jpg') no-repeat left center;
  background-size: cover;

  .login-box {
    width: 400px;
    height: 475px;
    top: 50%;
    left: 50%;
    transform: translateY(-50%);

    :deep(.ant-form-item-control-wrapper) {
      min-width: 100%;
    }
  }
}
</style>
