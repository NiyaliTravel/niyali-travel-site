import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// This comment is added to trigger a new deployment

export default defineConfig({
  base: '/niyali-travel-site/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    chunkSizeWarningLimit: 1000, // Optional: raises warning threshold to 1000kB
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          vendor: [
            'react-router-dom',
            '@tanstack/react-query',
            '@components/ui/sonner',
            '@components/ui/tooltip',
          ],
        },
      },
    },
  },
})