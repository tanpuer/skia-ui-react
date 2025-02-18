module.exports = function override(config, env) {
  // 禁用 JS 压缩
  config.optimization.minimize = false;
  // 禁用 CSS 压缩
  const cssPlugins = config.plugins.filter(plugin =>
	  plugin.constructor.name !== 'OptimizeCssAssetsPlugin'
  );
  config.plugins = cssPlugins;
  return config;
};
