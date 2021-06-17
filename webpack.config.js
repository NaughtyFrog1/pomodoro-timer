const CopyPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = (env, { mode }) => {
  const BUILD_PATH = mode === 'production' ? 'docs' : 'build';

  return {
    entry: {
      index: path.resolve(__dirname, 'src/js', 'index.js'),
    },
    output: {
      clean: true,
      path: path.resolve(__dirname, BUILD_PATH),
    },

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.scss$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src', 'index.html'),
      }),

      new MiniCssExtractPlugin(),

      new CopyPlugin({
        patterns: [{ from: 'src/assets', to: 'assets' }],
      }),

      new ESLintPlugin(),
    ],
  };
};
