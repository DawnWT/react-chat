import { defineConfig } from '@pandacss/dev'

export default defineConfig({
  preflight: true,
  jsxFramework: 'react',
  include: ['src/components/*.{js,jsx,ts,tsx}', 'src/pages/*.{js,jsx,ts,tsx}'],
  exclude: [],
  outdir: 'styled-system',
})
