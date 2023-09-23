import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig(({ mode }) => {
	return {
		plugins: [
			sveltekit(),
			tsconfigPaths(),
			mode === 'analysis' && visualizer({ open: true, filename: 'dist/analysis.html' })
		],
		server: { port: 8000, host: true }
	}
})
