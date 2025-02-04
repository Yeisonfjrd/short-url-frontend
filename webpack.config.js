const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  devServer: {
    static: path.join(__dirname, 'dist'),
    port: 9000,
    open: true,
    hot: true,
    historyApiFallback: true,
    proxy: [
      {
        context: ['/shorten'],  // Asegúrate de que la ruta sea correcta
        target: 'http://localhost:8080',  // Tu backend local
        secure: false,
        changeOrigin: true,
      },
    ],
  },
};