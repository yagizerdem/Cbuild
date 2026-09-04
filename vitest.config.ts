import { configDefaults, defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    include: [...configDefaults.include, "./__tests__/**/*.{test,spec}.ts(x)?"],
    exclude: [...configDefaults.exclude, "dist/**"],
  },
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "./src"),
    },
  },
});
