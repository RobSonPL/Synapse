import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  const securityHeaders = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'SAMEORIGIN',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
  };

  return {
    plugins: [react()],
    server: {
      host: '0.0.0.0',
      port: 3000,
      strictPort: true,
      headers: securityHeaders,
    },
    preview: {
      host: '0.0.0.0',
      port: 3000,
      strictPort: true,
      headers: securityHeaders,
    },
    build: {
      target: 'esnext',
      minify: 'esbuild',
      cssMinify: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('three')) {
                return 'three-vendor';
              }
              if (id.includes('framer-motion') || id.includes('motion')) {
                return 'motion-vendor';
              }
              if (id.includes('lucide-react')) {
                return 'icons';
              }
              if (id.includes('react') || id.includes('react-dom') || id.includes('react-helmet-async')) {
                return 'react-core';
              }
            }
          }
        }
      },
      chunkSizeWarningLimit: 900,
    },
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  }
})