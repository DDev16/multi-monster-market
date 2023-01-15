const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = {
  devServer: (configFunction) => {
    return (proxy, allowedHost) => {
      proxy.use(
        '/api',
        createProxyMiddleware({
          target: 'https://flare-api.flare.network/ext/C/rpc',
          changeOrigin: true,
          pathRewrite: { '^/api': '/' },
          onProxyRes: (proxyRes) => {
            proxyRes.headers['Access-Control-Allow-Origin'] = '*';
          },
        })
      );

      const config = configFunction(proxy, allowedHost);
      return config;
    };
  },
};


