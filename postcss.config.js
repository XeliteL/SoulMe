import postcssPxToREm from 'postcss-pxtorem';
import postcssPresetEnv from "postcss-preset-env";

export default ({ env }) => {
  const isProd = env === 'production';
  const plugins = [];

  if (isProd) {
    plugins.push(
      postcssPxToREm({
        propList: ['*'],
        mediaQuery: true,
      })
    )
  }

  plugins.push(postcssPresetEnv())

  return {
    plugins
  }
}