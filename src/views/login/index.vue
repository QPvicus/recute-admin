<!--
 * @Author: Taylor Swift
 * @Date: 2021-06-05 13:04:01
 * @LastEditTime: 2021-06-05 21:36:55
 * @Description: 
-->

<template>
	<div class="login-container">
		<div class="relative mt-15 ml-28 login-box">
			<h3 class="text-xl font-medium text-center">
				大学生招聘后台管理系统
			</h3>
			<a-form
				class="p-4 mt-4"
				:model="formData"
				:rules="getFormRules"
				ref="formRef"
				@keypress.enter="handleLogin"
			>
				<a-form-item name="account">
					<a-input
						size="large"
						v-model:value="formData.account"
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
				<a-divider>其他登录方式</a-divider>

				<div class="flex justify-evenly " :class="`sign-in-way`">
					<GithubFilled />
					<WechatFilled />
					<AlipayCircleFilled />
					<GoogleCircleFilled />
					<TwitterCircleFilled />
				</div>
			</a-form>
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent, reactive, ref } from 'vue'
	import { useFormRules, useFormValid } from './useLogin'
	import {
		GithubFilled,
		WechatFilled,
		AlipayCircleFilled,
		GoogleCircleFilled,
		TwitterCircleFilled,
		UserOutlined,
		LockOutlined
	} from '@ant-design/icons-vue'

	export default defineComponent({
		name: 'LoginForm',
		components: {
			GithubFilled,
			WechatFilled,
			AlipayCircleFilled,
			GoogleCircleFilled,
			TwitterCircleFilled,
			UserOutlined,
			LockOutlined
		},
		setup() {
			const formRef = ref()
			const formData = reactive({
				account: 'admin',
				password: '123456'
			})
			const loading = ref(false)
			const { getFormRules } = useFormRules()
			const { validForm } = useFormValid(formRef)
			async function handleLogin() {
				const data = await validForm()
				if (!data) return
				try {
					loading.value = true
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
				loading
			}
		}
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
