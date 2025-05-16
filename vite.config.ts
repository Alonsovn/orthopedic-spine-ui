import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    base: env.VITE_APP_BASE_URL || '/',
    build: {
      outDir: 'build',
      assetsDir: 'assets',
      emptyOutDir: true,
      sourcemap: mode === 'development',
      minify: mode === 'production' ? 'esbuild' : false,
    },
  };
});
