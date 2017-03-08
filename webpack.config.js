var path = require('path');

module.exports = {
  entry: './src/index-search.js',
  output: {
    filename: 'app-sales-search.bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react-router': 'ReactRouter',
    'searchkit':'Searchkit',
    'react-burger-menu':'BurgerMenu'
},
   module: {
    loaders: [
     // { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
     // { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
    test: /\.jsx?$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
    query: {
        presets: ['es2015']
    }
}
    ]
  }
};