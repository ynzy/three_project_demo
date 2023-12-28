import type ViteEnv from '../../types/global';

/**
 * Generate proxy
 * @param viteEnv
 * @param target
 */
export function createProxy(viteEnv: ViteEnv, target: string, viteConfig: any) {
  // const target = `${IP}:${viteEnv.VITE_PORT}`;
  console.log('\x1B[33m%s\x1b[0m', '正在请求的服务端接口:', target);

  return {
    proxy: {
      // '/webglCity': {
      //   target: 'http://localhost:5173',
      //   rewrite: () => '/src/project/webglCity/index.html'
      // },
      // '/b': {
      //   target: 'http://localhost:3001',
      //   rewrite: () => '/src/pageB/index.html'
      // }
    }
    //代理'/rsm'
    // '/api': {
    //     target,
    //     changeOrigin: true,
    //     // rewrite: (path: any) => path.replace(/^\/api/, ''),
    // },
    // '/api/thingue-service/ws': {
    //     target: target.replace('http://', 'ws://'),
    //     changeOrigin: true,
    //     ws: true,
    //     // rewrite: (path: string) => path.replace(/~\/webrtc-player/,"")
    // },
    // '/rsm': {
    //     target: target,
    //     // changeOrigin: true
    // },
  };
}
