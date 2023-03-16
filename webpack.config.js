const path = require("path");
require('dotenv').config({ path: './.env' });
import { DefinePlugin } from 'webpack'

module.exports = {
   entry: {
      bundle: path.join(__dirname, '/client/src/index.jsx')},
   output: {
      path: path.join(__dirname, '/client/dist'),
      filename: 'bundle.js'
   },
   plugins: [
      new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    })
   ],
   module: {
      rules: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
         },
         {
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ],
        }
      ]
   },
   mode: 'development'
}
