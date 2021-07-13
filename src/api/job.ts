/*
 * @Author: Taylor Swift
 * @Date: 2021-07-13 19:22:38
 * @LastEditTime: 2021-07-13 20:49:43
 * @Description:
 */

import request from '/@/utils/request'

/**
 * 获取所有职位信息
 * @param nowPage
 * @param sumPage
 * @param keyWord
 * @returns
 */
export const getAllJob = (nowPage: number, sumPage: number, keyWord = '') => {
  return request({
    url: '/show/positionShowPage',
    method: 'POST',
    data: {
      nowPage,
      sumPage,
      keyWord,
    },
  })
}

/**
 * 根据id 删除职位
 * @param id
 * @returns
 */
export const deleteJobById = (id: string) => {
  return request({
    url: '/company/deletePosition',
    method: 'POST',
    params: {
      id,
    },
  })
}

/**
 *  根据职位名称获取
 * @param nowPage
 * @param sumPage
 * @param keyWord
 * @returns
 */
export const getJobBySearch = (
  nowPage: number,
  sumPage: number,
  keyWord = ''
) => {
  return request({
    url: '/show/positionNameShowPage',
    method: 'POST',
    data: {
      nowPage,
      sumPage,
      keyWord,
    },
  })
}
