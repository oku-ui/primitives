// vitest.config.ts
import { defineConfig } from "file:///Users/faithfulojebiyi/Apps/Opensource/primitives/node_modules/.pnpm/vitest@0.30.1_jsdom@21.1.1/node_modules/vitest/dist/config.js";
import Vue from "file:///Users/faithfulojebiyi/Apps/Opensource/primitives/node_modules/.pnpm/@vitejs+plugin-vue@4.2.1_vite@4.3.1_vue@3.3.0-beta.5/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import VueMacros from "file:///Users/faithfulojebiyi/Apps/Opensource/primitives/node_modules/.pnpm/unplugin-vue-macros@2.1.1_esbuild@0.17.18_rollup@3.21.0_vite@4.3.1_vue@3.3.0-beta.5/node_modules/unplugin-vue-macros/dist/vite.mjs";
var vitest_config_default = defineConfig({
  plugins: [
    VueMacros({
      plugins: {
        vue: Vue()
      }
    })
  ],
  test: {
    environment: "jsdom",
    coverage: {
      provider: "c8",
      // or 'c8',
      reporter: ["text", "json-summary", "json", "html"]
    },
    exclude: [
      "**/node_modules/**",
      "**/dist/**"
    ],
    include: ["./**/*.test.ts"]
  }
});
export {
  vitest_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZXN0LmNvbmZpZy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9mYWl0aGZ1bG9qZWJpeWkvQXBwcy9PcGVuc291cmNlL3ByaW1pdGl2ZXNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9mYWl0aGZ1bG9qZWJpeWkvQXBwcy9PcGVuc291cmNlL3ByaW1pdGl2ZXMvdml0ZXN0LmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvZmFpdGhmdWxvamViaXlpL0FwcHMvT3BlbnNvdXJjZS9wcmltaXRpdmVzL3ZpdGVzdC5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlc3QvY29uZmlnJ1xuaW1wb3J0IFZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgVnVlTWFjcm9zIGZyb20gJ3VucGx1Z2luLXZ1ZS1tYWNyb3Mvdml0ZSdcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIFZ1ZU1hY3Jvcyh7XG4gICAgICBwbHVnaW5zOiB7XG4gICAgICAgIHZ1ZTogVnVlKCksXG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxuICB0ZXN0OiB7XG4gICAgZW52aXJvbm1lbnQ6ICdqc2RvbScsXG4gICAgY292ZXJhZ2U6IHtcbiAgICAgIHByb3ZpZGVyOiAnYzgnLCAvLyBvciAnYzgnLFxuICAgICAgcmVwb3J0ZXI6IFsndGV4dCcsICdqc29uLXN1bW1hcnknLCAnanNvbicsICdodG1sJ10sXG4gICAgfSxcbiAgICBleGNsdWRlOiBbXG4gICAgICAnKiovbm9kZV9tb2R1bGVzLyoqJyxcbiAgICAgICcqKi9kaXN0LyoqJyxcbiAgICBdLFxuICAgIGluY2x1ZGU6IFsnLi8qKi8qLnRlc3QudHMnXSxcbiAgfSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXlVLFNBQVMsb0JBQW9CO0FBQ3RXLE9BQU8sU0FBUztBQUNoQixPQUFPLGVBQWU7QUFFdEIsSUFBTyx3QkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsVUFBVTtBQUFBLE1BQ1IsU0FBUztBQUFBLFFBQ1AsS0FBSyxJQUFJO0FBQUEsTUFDWDtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLE1BQU07QUFBQSxJQUNKLGFBQWE7QUFBQSxJQUNiLFVBQVU7QUFBQSxNQUNSLFVBQVU7QUFBQTtBQUFBLE1BQ1YsVUFBVSxDQUFDLFFBQVEsZ0JBQWdCLFFBQVEsTUFBTTtBQUFBLElBQ25EO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUDtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsSUFDQSxTQUFTLENBQUMsZ0JBQWdCO0FBQUEsRUFDNUI7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
