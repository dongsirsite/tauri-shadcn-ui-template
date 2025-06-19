import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
const host = process.env.TAURI_DEV_HOST;

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 10003,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
          protocol: "ws",
          host,
          port: 10004,
        }
      : undefined,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"],
    },
  },
  build: {
    // 按照业务模块拆分代码
    rollupOptions: {
      output: {
        // 根据模块路径动态生成 chunk 名称
        manualChunks: (id) => {
          // 匹配 src/page/ 目录下的业务模块，例如 src/page/comm_info -> comm_info
          const match = id.match(/src\/page\/([^/]+)\//);
          if (match && match[1]) {
            if (id.startsWith('src/page/common')) {
              return undefined; // 排除 /src/page/common 目录
            }
            return match[1]; // 返回匹配到的模块名称作为 chunk 名称
          }
          // 对于不符合业务模块规则的路径，返回 undefined，让 Vite/Rollup 按照默认规则处理
          return undefined;
        },
      },
    },
  },
});
