import { fileURLToPath, URL } from 'node:url';

import { defineConfig, loadEnv } from 'vite';
import type { ConfigEnv } from 'vite';

import { createProxy } from './build/vite/proxy';
import { wrapperEnv } from './build/utils';
import { createVitePlugins } from './build/vite/plugin';
import { createBuild } from './build/vite/build';
import { resolve } from 'node:path';

const target = 'http://XXX';

// https://vitejs.dev/config/
const viteConfig = defineConfig(({ command, mode }: ConfigEnv) => {
  console.log('command', command);
  console.log('mode', mode);
  const root = process.cwd(); // 当前工作目录
  const isBuild = command === 'build'; // 是否是构建 serve
  const env = loadEnv(mode, root); // 加载env环境
  // The boolean type read by loadEnv is a string. This function can be converted to boolean type
  const viteEnv = wrapperEnv(env);
  console.log('viteEnv', viteEnv);
  console.log('\x1B[33m%s\x1b[0m', '正在运行的环境:', viteEnv.VITE_ENV);
  return {
    // root: resolve(__dirname, 'src'),
    // root: fileURLToPath(new URL('./src', import.meta.url)),
    base: isBuild ? './' : '/',
    server: {
      host: true,
      proxy: createProxy(viteEnv, target, viteConfig)
    },
    plugins: [...createVitePlugins(viteEnv, isBuild)],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@project': fileURLToPath(new URL('./src/project', import.meta.url)),
        '@webglCity': fileURLToPath(new URL('./src/project/webglCity', import.meta.url))
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          charset: false, // 避免出现: build时的 @charset 必须在第一行的警告
          additionalData: `
            @import "@/styles/mixin.scss";
            @import "@/styles/variables.scss";
            `
        }
      }
    },
    build: createBuild(viteEnv)
  };
});

export default viteConfig;
