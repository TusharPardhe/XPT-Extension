import path from "path";
import react from "@vitejs/plugin-react";
import EnvironmentPlugin from "vite-plugin-environment";
import nodePolyfills from "rollup-plugin-polyfill-node";
import removeConsole from "vite-plugin-remove-console";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";
import { viteStaticCopy } from "vite-plugin-static-copy";
import { defineConfig, loadEnv } from "vite";

const envDir = path.resolve(__dirname, "./src");

const viteConfig = ({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, envDir, "") };

    return defineConfig({
        root: "src",
        plugins: [
            react(),
            EnvironmentPlugin("all"),
            viteStaticCopy({
                targets: [
                    { src: path.resolve(__dirname, `./manifest_json/${process.env.BROWSER.toLowerCase()}_manifest.json`), dest: "", rename: "manifest.json" },
                    { src: path.resolve(__dirname, "./src/assets/png/xpt192.png"), dest: "" },
                    { src: path.resolve(__dirname, "./src/scripts/background.js"), dest: "" },
                    { src: path.resolve(__dirname, "./src/scripts/content.js"), dest: "" },
                ],
            }),
        removeConsole(),
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
                    // background: path.resolve(__dirname, "./src/scripts/background.js"),
                    // content: path.resolve(__dirname, "./src/scripts/content.js"),
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
};

export default viteConfig;
