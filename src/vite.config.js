import { resolve } from 'path';

export default {
  base: '/niyali-travel-site/',
  server: {
    port: 5173,
    strictPort: true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@pages': resolve(__dirname, 'src/pages'),
      '@contexts': resolve(__dirname, 'src/contexts')
    }
  }
};
