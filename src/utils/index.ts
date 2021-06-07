/*
 * @Author: Taylor Swift
 * @Date: 2021-06-07 09:34:17
 * @LastEditTime: 2021-06-07 09:37:43
 * @Description: 工具类
 */

const toString = Object.prototype.toString
export const is = (val: unknown, type: string): boolean => {
  return toString.call(val) === `[object ${type}]`
}
export const isString = (val: unknown): val is String => {
  return is(val, 'String')
}
