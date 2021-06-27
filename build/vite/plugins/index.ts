/*
 * @Author: Taylor Swift
 * @Date: 2021-06-05 11:33:52
 * @LastEditTime: 2021-06-27 13:15:45
 * @Description:
 */

import type { Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { styleImportPlugins } from './styleImport'
import windiCss from 'vite-plugin-windicss'
export function createVitePlugins(vite: ViteEnv, isBuild: boolean) {
  console.log(vite, isBuild)

  const vitePlugins: (Plugin | Plugin[])[] = [vue(), vueJsx()]
  vitePlugins.push(styleImportPlugins())

  vitePlugins.push(windiCss())
  return vitePlugins
}
