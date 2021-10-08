const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  reactStrictMode: true,
  basePath: isProd ? '/bitmap-code-generator' : '',
}
