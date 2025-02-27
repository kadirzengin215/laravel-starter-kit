import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [
        laravel({
            input: [
                "resources/assets/css/app.css",
                "resources/assets/js/app.js",
            ],
            refresh: true,
        }),
        tailwindcss(),
    ],
    server: {
        host: "0.0.0.0",
        hmr: {
            host: "localhost",
        },
    },
});
