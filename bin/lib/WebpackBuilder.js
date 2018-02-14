const webpack = require('webpack')
const config  = require('../../config/webpack.config.js')

class WebpackBuilder {

  build() {
    webpack(config, (err, stats) => {
      if(err || stats.hasErrors()) {
        console.log(stats.compilation.errors);
      }
    })
  }

}

module.exports = new WebpackBuilder()