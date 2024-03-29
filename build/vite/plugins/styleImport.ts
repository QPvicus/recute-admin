import styleImport from 'vite-plugin-style-import'

/**
 * 按需导入 ant-design-vue
 * @returns
 */
export function styleImportPlugins() {
	const pwaPlugin = styleImport({
		libs: [
			{
				libraryName: 'ant-design-vue',
				esModule: true,
				resolveStyle: (name) => {
					return `ant-design-vue/es/${name}/style/index`
				}
			}
		]
	})
	return pwaPlugin
}
