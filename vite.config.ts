import { defineConfig } from "vite";
import path from "path";
import { getEnv } from "./vite/util";
const env = getEnv();
import viteSetting from "./vite/vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [...viteSetting()],
  server: {
    open:true,//是否自动打开浏览器，可选项
    cors:true,//允许跨域。
    host: true,
    // port: env.VITE_PORT as unknown as number,
    proxy: {
      "backend": {
        target: "http://badminton_api.61fly.cn",
        changeOrigin: true,//开启跨域
        rewrite: (path) => path.replace(/backend/, ""),
      },
    },
  },
  // resolve: {
  //   alias: [{ find: "@", replacement: resolve(__dirname, "src") }],
  // },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "#": path.resolve(__dirname, "./"),
    },
  },
});
