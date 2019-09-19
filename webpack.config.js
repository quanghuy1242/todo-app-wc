const merge = require('webpack-merge');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const { createDefaultConfig } = require('@open-wc/building-webpack');
const config = createDefaultConfig({
  input: path.resolve(__dirname, './index.html'),
});

module.exports = (env, argv) => {
  return merge(config, {
    output: {
      publicPath: '/'
    },
    devtool: argv.mode !== 'production' ? 'source-map' : 'false',
    plugins: [
      new CopyWebpackPlugin([
        'style.css',
      ]),
    ],
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true
    }
  })
}