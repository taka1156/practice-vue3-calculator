module.exports = {
  // publicPath: './'
  publicPath:
    process.env.NODE_ENV === 'production' ? '/practice-vue3-calculator/' : '/',
  outputDir: 'docs',
  assetsDir: './'
};
