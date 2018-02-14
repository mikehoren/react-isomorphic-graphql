var fs    = require('fs');
var babel = require('babel-core');

var airbnb  = require('babel-preset-airbnb');
var css     = require('babel-plugin-css-modules-transform').default

class BabelTransformer {

  install(options) {
    options = options || {};
    require.extensions['.jsx'] = this.transform;
    require.extensions['.js'] = this.transform;
  }

  transform(module, filename) {
    let src = fs.readFileSync(filename, {encoding: 'utf8'});

    if(filename.indexOf('node_modules') > -1) {
      return module._compile(src, filename);
    }
    
    try {
      src = babel.transform(src, { filename: filename, ast : false, presets : [airbnb], plugins: [css] }).code;
    } catch (e) {
      throw Error('Error transforming ' + filename + ' to JS: ' + e.toString());
    }
    module._compile(src, filename);
  }

}

module.exports = new BabelTransformer();