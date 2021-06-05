/*
 * @Author: Taylor Swift
 * @Date: 2021-06-05 14:20:53
 * @LastEditTime: 2021-06-05 14:24:31
 * @Description:
 */

import request from '/@/utils/request'

/**
 *  管理员登录
 * @param userInfo 用户信息
 * @returns
 */

export interface UserInfo {
	username: string
	password: string
}

export function login(userInfo: UserInfo) {
	return request({
		method: 'POST',
		data: userInfo
	})
}
