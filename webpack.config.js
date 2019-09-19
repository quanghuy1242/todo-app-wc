const merge = require('webpack-merge');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// // For IE Support
// const { createCompatibilityConfig } = require('@open-wc/building-webpack');
// const configs = createCompatibilityConfig({
//   input: path.resolve(__dirname, './index.html'),
// });

// module.exports = [
//   merge(configs[0], {
//     plugins: [
//       new CopyWebpackPlugin([
//         'style.css',
//       ]),
//     ],
//   }),
//   configs[1],
// ];

// For modern browsers
const { createDefaultConfig } = require('@open-wc/building-webpack');
const config = createDefaultConfig({
  input: path.resolve(__dirname, './index.html'),
});

module.exports = merge(config, {
  output: {
    publicPath: '/'
  },
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