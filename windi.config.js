/*
 * @Author: Taylor Swift
 * @Date: 2021-06-05 13:59:21
 * @LastEditTime: 2021-06-05 14:04:07
 * @Description:
 */

import lineClamp from 'windicss/plugin/line-clamp'
import colors from 'windicss/colors'

import { defineConfig } from 'vite-plugin-windicss'

export default defineConfig({
	darkMode: 'class',
	plugins: [lineClamp],
	theme: {
		extend: {
			colors: {
				...colors,
				primary: '#0960bd'
			},
			screens: {
				sm: '576px',
				md: '768px',
				lg: '992px',
				xl: '1200px',
				'2xl': '1600px'
			}
		}
	}
})
