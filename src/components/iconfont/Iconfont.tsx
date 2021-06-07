/*
 * @Author: Taylor Swift
 * @Date: 2021-06-07 09:15:09
 * @LastEditTime: 2021-06-07 09:51:34
 * @Description:  封装 Iconfont  可以传属性 size color type 用户自定义的 类型
 */

import { createFromIconfontCN } from '@ant-design/icons-vue'
import { computed, CSSProperties, defineComponent, PropType, unref } from 'vue'
import { isString } from '/@/utils'
let MyIcon = createFromIconfontCN({
  //  本地加载
  scriptUrl: '', // 在 iconfont.cn 上生成
})

export default defineComponent({
  name: 'Iconfont',
  props: {
    type: {
      type: String as PropType<string>,
      default: '',
    },
    color: {
      type: String,
      default: 'unset',
    },
    size: {
      type: [String, Number] as PropType<string | number>,
      default: 14,
    },
    scriptUrl: {
      type: String as PropType<string>,
      default: '',
    },
  },
  setup(props, { attrs }) {
    if (props.scriptUrl) {
      MyIcon = createFromIconfontCN({
        scriptUrl: props.scriptUrl,
      })
    }
    const wrapStyle = computed((): CSSProperties => {
      const { color, size } = props
      const fontSize = isString(size) ? parseInt(size) : size
      return {
        color,
        fontSize: `${fontSize}px`,
      }
    })
    return () => {
      return (
        <MyIcon type={props.type || ''} {...attrs} style={unref(wrapStyle)} />
      )
    }
  },
})
