const { getBabelLoader } = require('react-app-rewired');

const path = require('path');

module.exports = function override(config, env) {
  const babelLoader = getBabelLoader(config.module.rules);
  const pwd = path.resolve();
  babelLoader.include = [path.normalize(`${pwd}/src`)];
  // use babelrc
  babelLoader.options.babelrc = true;
  return config;
};