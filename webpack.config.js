var package = require('./package.json');

new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV),
  },
  API_URL: JSON.stringify(package.apiUrl)
})