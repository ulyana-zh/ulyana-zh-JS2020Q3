const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = (env, options) => {

  const isProduction = options.mode === 'production';

  const config = {
    mode: isProduction ? 'production' : "development",
    devtool: isProduction ? 'none' : 'source-map',
    watch: !isProduction,
    entry: {
      main: [path.resolve(__dirname, './src/js/index.js'), './src/sass/style.scss']
    },
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
              // {
              //   test: /\.css$/i,
              //   use: [MiniCssExtractPlugin.loader, 'css-loader'],
              // },
              {
                test: /\.s[ac]ss$/i,
                use: [
                  MiniCssExtractPlugin.loader,
                  "css-loader",
                  "sass-loader",
                ],
              },
              // {
              //   test: /.(png|svg|jpe?g|gif)$/,
              //   use: [
              //     {
              //       loader: 'file-loader',
              //     },
              //   ]
              // },  
              {
                test: /\.(jpg|svg|png)$/,
                use: {
                  loader: require.resolve("file-loader") + "?name=../[path][name].[ext]",
                },
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