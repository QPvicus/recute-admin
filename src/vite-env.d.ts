/// <reference types="vite/client" />

interface ImportMetaEnv {
	VITE_APP_TITLE: string
	VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none'
}
