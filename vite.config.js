import { defineConfig, loadEnv } from 'vite';

import EnvironmentPlugin from 'vite-plugin-environment';
import fs from 'fs/promises';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import path from 'path';
import react from '@vitejs/plugin-react';
import removeConsole from 'vite-plugin-remove-console';
import { viteStaticCopy } from 'vite-plugin-static-copy';

const envDir = path.resolve(__dirname, '.');

const viteConfig = ({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, envDir, '') };

    return defineConfig({
        root: 'src',
        server: {
            watch: {
                usePolling: true,
            },
        },
        plugins: [
            react(),
            nodePolyfills(),
            EnvironmentPlugin('all'),
            viteStaticCopy({
                targets: [
                    {
                        src: path.resolve(
                            __dirname,
                            `./manifest_json/${process.env.BROWSER.toLowerCase()}_manifest.json`
                        ),
                        dest: '',
                        rename: 'manifest.json',
                    },
                    { src: path.resolve(__dirname, './src/assets/png/xpt192.png'), dest: '' },
                ],
            }),
            removeConsole(),
        ],
        resolve: {
            extensions: ['*', '.js', '.jsx'],
        },
        optimizeDeps: {
            esbuildOptions: {
                define: {
                    global: 'globalThis',
                },
                plugins: [
                    {
                        name: 'load-js-files-as-jsx',
                        setup(build) {
                            build.onLoad({ filter: /src\/.*\.js$/ }, async (args) => ({
                                loader: 'jsx',
                                contents: await fs.readFile(args.path, 'utf8'),
                            }));
                        },
                    },
                ],
            },
        },
        build: {
            outDir: path.resolve(__dirname, 'dist'),
            rollupOptions: {
                input: {
                    index: path.resolve(__dirname, './src/index.html'),
                    background: path.resolve(__dirname, './src/scripts/background.js'),
                    // content: path.resolve(__dirname, "./src/scripts/content.js"),
                },
                output: { entryFileNames: '[name].js' },
                plugins: [nodePolyfills()],
            },
        },
        esbuild: {
            loader: 'jsx',
            include: /src\/.*\.jsx?$/,
            exclude: [],
        },
    });
};

export default viteConfig;
