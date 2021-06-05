/*
 * @Author: Taylor Swift
 * @Date: 2021-06-05 13:23:40
 * @LastEditTime: 2021-06-05 13:31:34
 * @Description:
 */

import { defineStore } from 'pinia'
import { store } from '/@/store'

interface UserState {
	token: string
}
export const useUserStore = defineStore({
	id: 'user',
	state: (): UserState => ({
		token: ''
	}),
	getters: {
		getToken(): string {
			return this.token
		}
	},
	actions: {
		setToken(token: string) {
			this.token = token
		}
	}
})

export function useUserStoreWithOut() {
	return useUserStore(store)
}
