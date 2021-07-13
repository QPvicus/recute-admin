/*
 * @Author: Taylor Swift
 * @Date: 2021-07-08 12:27:08
 * @LastEditTime: 2021-07-12 16:51:03
 * @Description:
 */

import request from '/@/utils/request'

/**
 * 获取公司信息列表
 * @param nowPage
 * @param sumPage
 * @param keyWord
 * @returns
 */
export const getCompanyList = (
  nowPage: number,
  sumPage: number,
  keyWord = ''
) => {
  return request({
    url: '/show/companyShowPage',
    method: 'POST',
    data: {
      nowPage,
      sumPage,
      keyWord,
    },
  })
}

/**
 * 根据公司id 删除公司信息
 * @param id
 * @returns
 */
export const deleteCompany = (id: string) => {
  return request({
    url: '/xxx',
    method: 'POST',
  })
}

export const queryCompanyById = () => {
  return request({
    url: '/sxxx',
    method: 'POST',
  })
}

/**
 * 根据关键字 搜索公司列表
 * @param keyWord
 * @param nowPage
 * @param sumPage
 * @returns
 */
export const queryCompanyListBySearch = (
  keyWord: string,
  nowPage: number,
  sumPage: number
) => {
  return request({
    url: '/show/companyNameShowPage',
    method: 'POST',
    data: {
      keyWord,
      nowPage,
      sumPage,
    },
  })
}

/**
 * 删除公司信息
 * @param id
 * @returns
 */
export const deleteCompanyInfo = (id: string) => {
  return request({
    url: '/company/deleteInformation',
    method: 'POST',
    params: {
      id,
    },
  })
}
