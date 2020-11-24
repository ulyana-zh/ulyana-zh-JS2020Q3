const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = (env, options) => {

  const isProduction = options.mode === 'production';

  const config = {
    mode: isProduction ? 'production' : "development",
    watch: !isProduction,
    entry: ['./src/index.js', './src/style.css'],
    output: {
    filename: 'script.js',
    path: path.resolve(__dirname, './dist'),
  },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
              },
              {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
              },
              {
                test: /\.(png|svg|jpe?g|gif)$/,
                use: [
                  {
                    loader: 'file-loader',
                  },
                ]
              },  
              {
                test: /\.html$/i,
                loader: 'html-loader',
              },  
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'style.css'
        }),
    ]
  }

  return config; 
};