const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    //filename: 'main.js',
    //path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    static: { 
      directory: path.resolve(__dirname, './'), 
      publicPath: '/'
    }
  }
};