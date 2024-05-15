const { createProxyMiddleware } = require('http-proxy-middleware');
const localHost = process.env.DEV_SERVER_PROXY || 'http://localhost:5000';

const proxyHandler = function (app) {
    app.use(
      '/api',
      createProxyMiddleware({
          target: localHost + '/api',
          changeOrigin: true,
      })
    );
}

module.exports = proxyHandler;