import js from "@eslint/js"
import nextPlugin from "@next/eslint-plugin-next"
import tseslint from "typescript-eslint"
import eslintConfigPrettier from "eslint-config-prettier"
import reactHooks from "eslint-plugin-react-hooks"
import simpleImportSort from "eslint-plugin-simple-import-sort"

export default tseslint.config(
  { ignores: [".next/", "next-env.d.ts"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  reactHooks.configs.flat["recommended-latest"],
  nextPlugin.configs["core-web-vitals"],
  eslintConfigPrettier,
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "no-console": "warn",
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^react", "^[a-z]"],
            ["^\\u0000(?!\\.)"],
            ["^@/"],
            [
              "^\\.\\.(?!/?$)",
              "^\\.\\./?$",
              "^\\./(?=.*/)(?!/?$)",
              "^\\.(?!/?$)",
              "^\\./?$",
            ],
            ["^\\u0000\\.", "^.+\\.scss$"],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
      "@next/next/no-html-link-for-pages": "off",
    },
  },
)
