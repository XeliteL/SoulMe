import {
  defineConfig,
  pluginSsg,
  pluginBundle,
  pluginImage,
  pluginSprite,
  pluginSearch,
  pluginIsland,
  pluginBeautify,
} from "minista"
import react from "@vitejs/plugin-react"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig(({ command, isSsrBuild }) => {
  const isBuild = command === "build" && !(isSsrBuild ?? false)

  return {
    root: "",
    base: "/",
    publicDir: "public",

    resolve: {
      alias: [
        {
          find: "@/",
          replacement: path.resolve(__dirname, "src") + "/",
        },
      ],
    },

    css: {
      modules: {
        scopeBehaviour: "local",
        localsConvention: "camelCaseOnly",
      },
      preprocessorOptions: {
        scss: {
          additionalData: `@use '@/app/styles/helpers' as *;`,
          silenceDeprecations: ["legacy-js-api"],
        },
      },
    },

    build: {
      outDir: isBuild ? "dist" : undefined,
      rolldownOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            const name = assetInfo.name ?? ""
            const originalNames = assetInfo.originalFileNames ?? []

            if (
              name === "favicon.ico" ||
              originalNames.some((file) => file.includes("/public/"))
            ) {
              return "[name][extname]"
            }

            const isSprite = originalNames.some((file) =>
              file.includes("/.minista/sprite/"),
            )
            if (isSprite) return "assets/images/[name][extname]"

            if (/\.(png|jpe?g|gif|bmp|svg|webp|avif)$/.test(name))
              return "assets/images/[name][extname]"

            if (/\.(woff2?|ttf|otf|eot)$/.test(name))
              return "src/shared/assets/fonts/[name][extname]"

            return "assets/[name][extname]"
          },
          chunkFileNames: "assets/[name].js",
          entryFileNames: "assets/[name].js",
        },
      },
    },

    plugins: [
      react(),
      pluginSsg(),
      pluginBundle(),
      pluginImage({
        optimize: {
          outName: "[name]",
          layout: "constrained",
          breakpoints: [
            320, 400, 640, 800, 1024, 1280, 1440, 1920, 2560, 2880, 3840,
          ],
          resolutions: [1, 2],
          fit: "cover",
          position: "centre",
        },
      }),
      pluginSprite({
        config: {
          plugins: [
            {
              name: "removeAttrs",
              params: { attrs: ["fill", "stroke"] },
            },
          ],
        },
      }),
      pluginIsland(),
      pluginSearch({
        outName: "search",
        targetSelector: "[data-search]",
        hit: { minLength: 3, english: true, katakana: true, kanji: true },
      }),
      pluginBeautify({
        src: ["**/*.html"],
        htmlOptions: {
          indent_size: 2,
          max_preserve_newlines: 0,
          indent_inner_html: true,
        },
      }),
    ],
  }
})