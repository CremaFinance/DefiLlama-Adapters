module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
   webpackFinal: async (config) => {

    let finalConfig = {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          '@emotion/core': '@emotion/react',
          'emotion-theming': '@emotion/react'
        }
      },
      node: {fs:'empty'}
    }
    finalConfig.module.rules.push(
      {
          type: 'javascript/auto',
          test: /\.mjs$/,
          include: /node_modules/,
      },
  )
    return finalConfig;
}
}