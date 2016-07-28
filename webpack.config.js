var path = require("path");

module.exports = {
  context: __dirname,
  entry: "./client/scripts/canvas_render_script.js",
  output: {
    path: path.join(__dirname,'client', 'webpack'),
    filename: "bundle.js",
    devtoolModuleFilenameTemplate: '[resourcePath]',
    devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]'
  },

  devtool: 'source-maps',
  resolve: {
    extensions: ["", ".js"]
  }
};
