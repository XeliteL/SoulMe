import js from "@eslint/js"
import nextPlugin from "@next/eslint-plugin-next"
import tseslint from "typescript-eslint"
import eslintConfigPrettier from "eslint-config-prettier"
import reactHooks from "eslint-plugin-react-hooks"
import simpleImportSort from "eslint-plugin-simple-import-sort"

const LAYERS = ["shared", "entities", "features", "widgets", "views"]
const SLICED_LAYERS = ["entities", "features", "widgets", "views"]

const layerRules = LAYERS.map((layer, index) => ({
  files: [`src/${layer}/**/*.{ts,tsx}`],
  rules: {
    "no-restricted-imports": [
      "error",
      {
        patterns: [
          {
            group: LAYERS.slice(layer === "shared" ? index + 1 : index).map(
              (upperLayer) => `@/${upperLayer}/**`,
            ),
            message: `${layer}: only lower layers can be imported; within your own slice, use relative imports`,
          },
          {
            group: SLICED_LAYERS.map((slicedLayer) => `@/${slicedLayer}/*/**`),
            message: "Import from a slice only through its index.ts",
          },
        ],
      },
    ],
  },
}))

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
    },
  },
  ...layerRules,
)
