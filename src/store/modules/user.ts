/*
 * @Author: Taylor Swift
 * @Date: 2021-06-05 13:23:40
 * @LastEditTime: 2021-06-09 09:38:54
 * @Description:  用户模块
 */

import { defineStore } from 'pinia'
import { TOKEN } from '../constants'
import { store } from '/@/store'

interface UserState {
  token: string
}
export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    token: '',
  }),
  getters: {
    getToken(): string {
      return this.token
    },
  },
  actions: {
    setToken(token: string) {
      this.token = token
      localStorage.setItem(TOKEN, token)
    },
    removeToken() {
      localStorage.removeItem(TOKEN)
    },
  },
})

export function useUserStoreWithOut() {
  return useUserStore(store)
}
