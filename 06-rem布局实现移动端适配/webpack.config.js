const path = require('path');

module.exports = {
  entry: './app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './build')
  },
  module:{
  	rules: [
       {
        test: /\.css$/, use: ['style-loader','css-loader']
       },
       {
       	test: /\.scss$/, use: ['style-loader','css-loader','sass-loader']
       },
       {
       	test: /\.(png|jpg|gif)$/, use: [{
       		loader: 'url-loader',
       		options:{limit:8192}
       	}]
       }
     ]
   }
};