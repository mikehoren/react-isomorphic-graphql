const utils = {};

utils.isServer = function() {
  return typeof window === 'undefined'
}

export default utils;