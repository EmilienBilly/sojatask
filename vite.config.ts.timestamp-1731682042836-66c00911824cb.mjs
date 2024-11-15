// vite.config.ts
import { defineConfig } from "file:///C:/Users/emili/Documents/Code/projet-cda/node_modules/vite/dist/node/index.js";
import { getDirname } from "file:///C:/Users/emili/Documents/Code/projet-cda/node_modules/@adonisjs/core/build/src/helpers/main.js";
import inertia from "file:///C:/Users/emili/Documents/Code/projet-cda/node_modules/@adonisjs/inertia/build/src/plugins/vite.js";
import react from "file:///C:/Users/emili/Documents/Code/projet-cda/node_modules/@vitejs/plugin-react/dist/index.mjs";
import adonisjs from "file:///C:/Users/emili/Documents/Code/projet-cda/node_modules/@adonisjs/vite/build/src/client/main.js";
import tailwind from "file:///C:/Users/emili/Documents/Code/projet-cda/node_modules/tailwindcss/lib/index.js";
import autoprefixer from "file:///C:/Users/emili/Documents/Code/projet-cda/node_modules/autoprefixer/lib/autoprefixer.js";
var __vite_injected_original_import_meta_url = "file:///C:/Users/emili/Documents/Code/projet-cda/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [
    inertia({ ssr: { enabled: false } }),
    react(),
    adonisjs({
      entrypoints: ["inertia/app/app.tsx"],
      reload: ["resources/views/**/*.edge"]
    })
  ],
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()]
    }
  },
  /**
   * Define aliases for importing modules from
   * your frontend code
   */
  resolve: {
    alias: {
      "~/": `${getDirname(__vite_injected_original_import_meta_url)}/inertia/`
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxlbWlsaVxcXFxEb2N1bWVudHNcXFxcQ29kZVxcXFxwcm9qZXQtY2RhXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxlbWlsaVxcXFxEb2N1bWVudHNcXFxcQ29kZVxcXFxwcm9qZXQtY2RhXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9lbWlsaS9Eb2N1bWVudHMvQ29kZS9wcm9qZXQtY2RhL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHsgZ2V0RGlybmFtZSB9IGZyb20gJ0BhZG9uaXNqcy9jb3JlL2hlbHBlcnMnXHJcbmltcG9ydCBpbmVydGlhIGZyb20gJ0BhZG9uaXNqcy9pbmVydGlhL2NsaWVudCdcclxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xyXG5pbXBvcnQgYWRvbmlzanMgZnJvbSAnQGFkb25pc2pzL3ZpdGUvY2xpZW50J1xyXG5pbXBvcnQgdGFpbHdpbmQgZnJvbSAndGFpbHdpbmRjc3MnXHJcbmltcG9ydCBhdXRvcHJlZml4ZXIgZnJvbSAnYXV0b3ByZWZpeGVyJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbXHJcbiAgICBpbmVydGlhKHsgc3NyOiB7IGVuYWJsZWQ6IGZhbHNlIH0gfSksXHJcbiAgICByZWFjdCgpLFxyXG4gICAgYWRvbmlzanMoe1xyXG4gICAgICBlbnRyeXBvaW50czogWydpbmVydGlhL2FwcC9hcHAudHN4J10sXHJcbiAgICAgIHJlbG9hZDogWydyZXNvdXJjZXMvdmlld3MvKiovKi5lZGdlJ10sXHJcbiAgICB9KSxcclxuICBdLFxyXG5cclxuICBjc3M6IHtcclxuICAgIHBvc3Rjc3M6IHtcclxuICAgICAgcGx1Z2luczogW3RhaWx3aW5kKCksIGF1dG9wcmVmaXhlcigpXSxcclxuICAgIH0sXHJcbiAgfSxcclxuICAvKipcclxuICAgKiBEZWZpbmUgYWxpYXNlcyBmb3IgaW1wb3J0aW5nIG1vZHVsZXMgZnJvbVxyXG4gICAqIHlvdXIgZnJvbnRlbmQgY29kZVxyXG4gICAqL1xyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgICd+Lyc6IGAke2dldERpcm5hbWUoaW1wb3J0Lm1ldGEudXJsKX0vaW5lcnRpYS9gLFxyXG4gICAgfSxcclxuICB9LFxyXG59KVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXNULFNBQVMsb0JBQW9CO0FBQ25WLFNBQVMsa0JBQWtCO0FBQzNCLE9BQU8sYUFBYTtBQUNwQixPQUFPLFdBQVc7QUFDbEIsT0FBTyxjQUFjO0FBQ3JCLE9BQU8sY0FBYztBQUNyQixPQUFPLGtCQUFrQjtBQU4wSyxJQUFNLDJDQUEyQztBQVFwUCxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxRQUFRLEVBQUUsS0FBSyxFQUFFLFNBQVMsTUFBTSxFQUFFLENBQUM7QUFBQSxJQUNuQyxNQUFNO0FBQUEsSUFDTixTQUFTO0FBQUEsTUFDUCxhQUFhLENBQUMscUJBQXFCO0FBQUEsTUFDbkMsUUFBUSxDQUFDLDJCQUEyQjtBQUFBLElBQ3RDLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFFQSxLQUFLO0FBQUEsSUFDSCxTQUFTO0FBQUEsTUFDUCxTQUFTLENBQUMsU0FBUyxHQUFHLGFBQWEsQ0FBQztBQUFBLElBQ3RDO0FBQUEsRUFDRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFLQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxNQUFNLEdBQUcsV0FBVyx3Q0FBZSxDQUFDO0FBQUEsSUFDdEM7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
