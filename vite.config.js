import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // build: {
  //   outDir: '../../Effi-FE/src/main/resources/static'
  // },
  // server: {
  //   proxy: {
  //     '/api': 'http://localhost:8080'
  //   },
    server: {
      host: true,
      port: 5173 // 사용하고자 하는 포트 번호로 변경
    }
  }
)
