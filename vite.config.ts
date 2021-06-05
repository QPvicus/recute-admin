import type { UserConfig,ConfigEnv } from 'vite'
import {resolve} from 'path'
import {createVitePlugins} from './build/vite/plugins/index'

function resolvePath(dir: string) {
	return resolve(__dirname, '.', dir)
}

export default ({command}: ConfigEnv):UserConfig  => {
	const root = process.cwd()
	const isBuild = command === 'build'
	return {
		//  此处 需要设置 './' 因为打包后会解析成相对路径
		base: './',
		root,
		resolve: {
			alias: [
				{
					find: /\/@\//,
					replacement: resolvePath('src') + '/'
				},
				{
          find: /\/#\//,
          replacement: resolvePath('types') + '/',
        },
			]
		},
		plugins: createVitePlugins(null, isBuild),
		css: {
			preprocessorOptions: {
				less: {
          javascriptEnabled: true,
				}
			}
		},
		build: {
			outDir: 'dist',
			//  类似于压缩代码 Minify
			terserOptions: {
				compress: {
					//  防止无穷大被压缩 影响chrome的性能温题
					keep_infinity: true,
					drop_console: true
				}
			},
			//  关闭压缩大小报告 提升构建速度
			brotliSize: false,
			//  chunk 大小警告的限制
			chunkSizeWarningLimit: 2000
		}
	}
}
