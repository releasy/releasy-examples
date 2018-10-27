const path = require('path');
const md5File = require('md5-file');
const ignoreStyles = require('ignore-styles');

const register = ignoreStyles.default;
register(ignoreStyles.DEFAULT_EXTENSIONS, (mod, filename) => {
  if (!['.gif', '.jpeg', '.jpg', '.png', '.svg'].find(f => filename.endsWith(f))) {
    return ignoreStyles.noOp();
  } else {
    const hash = md5File.sync(filename).slice(0, 8);
    const bn = path.basename(filename).replace(/(\.\w{3})$/, `.${hash}$1`);

    mod.exports = `/static/media/${bn}`;
  }
});

require('@babel/polyfill');
require('@babel/register')({
  ignore: [/\/(build|node_modules)\//],
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    'dynamic-import-node',
    'react-loadable/babel',
    'macros',
  ]
});

require('./server');
