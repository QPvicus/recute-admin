/*
 * @Author: Taylor Swift
 * @Date: 2021-06-05 20:38:36
 * @LastEditTime: 2021-06-05 21:00:45
 * @Description:
 */

import { computed, unref } from 'vue'
import type {Ref} from 'vue'

export function useFormValid<T extends object = any>(formRef: Ref<any>) {
  async function validForm() {
    const form = unref(formRef)
    if (!form) return
    const data = form.validate()
    return data as T
  }

  return { validForm }
}


export function useFormRules() {
	const getAccountRule = computed(() => createRule('用户名不能为空'))
	const getPasswordRule = computed(() => createRule('密码不能为空'))
	const getFormRules = computed(() => {
		const accountFormRule = unref(getAccountRule)
		const passwordFormRule = unref(getPasswordRule)
		return {
			account: accountFormRule,
			password: passwordFormRule
		}
	})

	return {
		getFormRules
	}
}

function createRule(message: string) {
	return [{ required: true, message, trigger: 'change' }]
}
