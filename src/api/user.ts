/*
 * @Author: Taylor Swift
 * @Date: 2021-06-05 14:20:53
 * @LastEditTime: 2021-07-13 10:50:37
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
    url: '/adminLogin',
    method: 'POST',
    data: userInfo,
  })
}

/**
 * 获取所有的 学生信息
 * @param nowPage
 * @param sumPage
 * @param keyWord
 * @returns
 */
export const getAllStudent = (
  nowPage: number,
  sumPage: number,
  keyWord = ''
) => {
  return request({
    url: '/show/studentUserShowPage',
    method: 'POST',
    data: {
      nowPage,
      sumPage,
      keyWord,
    },
  })
}

/**
 *  根据id 删除 学生用户
 * @param id
 * @returns
 */
export const deleteStudentById = (id: string) => {
  return request({
    url: '/studentDelete',
    method: 'POST',
    params: {
      id,
    },
  })
}

/**
 * 现实所有公司用户
 * @param nowPage
 * @param sumPage
 * @param keyWord
 * @returns
 */
export const getAllCompanyList = (
  nowPage: number,
  sumPage: number,
  keyWord = ''
) => {
  return request({
    url: '/show/companyUserShowPage',
    method: 'POST',
    data: {
      nowPage,
      sumPage,
      keyWord,
    },
  })
}

/**
 *  删除公司用户
 * @param id
 * @returns
 */
export const deleteCompanyUserById = (id: string) => {
  return request({
    url: '/companyDelete',
    method: 'POST',
    params: {
      id,
    },
  })
}
