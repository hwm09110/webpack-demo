const baseConfig = require("./webpack.base.config.js");
const path = require("path");

module.exports = {
  ...baseConfig,
  mode: "development",
  devServer: {
    static: {
      directory: path.join(__dirname, "../dist"), //网站的根目录为 根目录/dist，如果配置不对，会报Cannot GET /错误\
    },
    // host: '0.0.0.0',
    port: 9000, //端口改为9000
    open: false, // 自动打开浏览器，适合懒人
    compress: true,
  },
};
