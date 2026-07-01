import postcssPxToREm from 'postcss-pxtorem';

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

  return {
    plugins
  }
}