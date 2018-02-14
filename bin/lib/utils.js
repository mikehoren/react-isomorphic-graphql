const utils = {};

module.exports = utils;

const assetExtensions = [
  'ico',
  'pdf',
  'jpeg',
  'jpg',
  'png',
  'gif',
  'css',
  'js',
  'map',
]

utils.isAsset = (url) => {
  const frags = url.split('.')
  const ext   = frags[frags.length - 1];
  return assetExtensions.indexOf(ext) > -1;
}