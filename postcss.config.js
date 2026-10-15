import process from "node:process"

const isProd = process.env.NODE_ENV === "production"

export default {
  plugins: {
    ...(isProd && {
      "postcss-pxtorem": { propList: ["*"], mediaQuery: true },
    }),
    "postcss-preset-env": {},
  },
}
