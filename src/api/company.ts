/*
 * @Author: Taylor Swift
 * @Date: 2021-07-08 12:27:08
 * @LastEditTime: 2021-07-08 12:29:06
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
