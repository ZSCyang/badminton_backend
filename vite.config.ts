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
    host: true,
    port: env.VITE_PORT as unknown as number,
    proxy: {
      "/cook": {
        target: "https://cook.ivs-rfid.com/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/cook/, ""),
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
