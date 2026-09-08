import js from "@eslint/js"
import tseslint from "typescript-eslint"
import eslintConfigPrettier from "eslint-config-prettier"
import simpleImportSort from "eslint-plugin-simple-import-sort"

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
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
    },
  },
)
