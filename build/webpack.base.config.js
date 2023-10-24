const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); //第二步导入

module.exports = {
  // mode: "production",
  // mode: "development",
  entry: "./src/main.js",
  output: {
    filename: "./dist/[hash]app.js", // dist文件夹不存在时，会自动创建
    hashDigestLength: 8,
  },
  plugins: [
    new HtmlWebpackPlugin(getHtmlWebpackPluginConfig()),
    new webpack.DefinePlugin({ BJ: JSON.stringify("北京") }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /.(jpe?g|png|gif)$/i, //图片文件
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10240,
              fallback: {
                loader: "file-loader",
                options: {
                  name: "img/[name].[hash:8].[ext]",
                },
              },
            },
          },
        ],
      },
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  useBuiltIns: "usage", //使用corejs的方式，表示按需加载
                  corejs: { version: 3 }, //指定core-js的版本
                  targets: {
                    //要兼容的目标浏览器
                    chrome: "58",
                    ie: "9",
                  },
                },
              ],
            ],
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js", // import Vue from 'vue' 进来的包是默认的阉割包，只提供了runtime-only的方式，改成引入完整版
    },
  },
};

function getHtmlWebpackPluginConfig() {
  return {
    title: "hello,零和壹在线课堂", // html5文件中<title>部分
    template: path.join(__dirname, "../public/index.html"), //如果觉得插件默认生成的hmtl5文件不合要求，可以指定一个模板，模板文件如果不存在，会报错，默认是在项目根目录下找模板文件，才模板为样板，将打包的js文件注入到body结尾处
    inject: "body", // true|body|head|false，四种值，默认为true,true和body相同,是将js注入到body结束标签前,head将打包的js文件放在head结束前,false是不注入，这时得要手工在html中加js
  };
}
