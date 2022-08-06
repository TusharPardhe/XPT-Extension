import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";
import EnvironmentPlugin from "vite-plugin-environment";
import path from "path";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";
import nodePolyfills from "rollup-plugin-polyfill-node";

// https://vitejs.dev/config/
export default defineConfig({
    root: "src",
    plugins: [
        react(),
        viteStaticCopy({
            targets: [
                { src: path.resolve(__dirname, "./manifest.json"), dest: "" },
                { src: path.resolve(__dirname, "./src/assets/png/xpt192.png"), dest: "" },
                { src: path.resolve(__dirname, "./src/scripts/*"), dest: "" },
            ],
        }),
        EnvironmentPlugin("all"),
    ],
    resolve: {
        extensions: ["*", ".js", ".jsx"],
        alias: [
            { find: "events", replacement: "rollup-plugin-node-polyfills/polyfills/events" },
            { find: "child_process", replacement: "rollup-plugin-node-polyfills" },
            { find: "path", replacement: "rollup-plugin-node-polyfills/polyfills/path" },
        ],
    },
    optimizeDeps: {
        esbuildOptions: {
            define: {
                global: "globalThis",
            },
            plugins: [
                NodeGlobalsPolyfillPlugin({
                    process: true,
                    buffer: true,
                }),
                NodeModulesPolyfillPlugin(),
            ],
        },
    },
    build: {
        outDir: path.resolve(__dirname, "dist"),
        rollupOptions: {
            input: {
                index: path.resolve(__dirname, "./src/index.html"),
            },
            output: { entryFileNames: "[name].js" },
            plugins: [nodePolyfills()],
        },
    },
    esbuild: {
        loader: "jsx",
        include: /src\/.*\.jsx?$/,
        exclude: [],
    },
});
