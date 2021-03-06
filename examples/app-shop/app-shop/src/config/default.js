// TODO move all this to app-config?

export default {
  apps: [
    {
      name: 'appHeader',
      containerId: 'app-header',
      appPort: 7001,
      cssPath: '/dist/app-header.css',
      jsPath: '/dist/app-header.js',
      urlPathRegex: '/*',
      baseUrlEnvironmentVariable: 'APP_HEADER_BASE_URL',
    },
    {
      disable: false,
      name: 'appProduct',
      containerId: 'app-product',
      appPort: 4001,
      cssPath: '/dist/app-product.css',
      jsPath: '/dist/app-product.js',
      urlPathRegex: '/products/*',
      className: 'm-4',
      baseUrlEnvironmentVariable: 'APP_PRODUCT_BASE_URL',
    },
    {
      disable: false,
      name: 'appCheckout',
      containerId: 'app-checkout',
      appPort: 5001,
      cssPath: '/dist/app-checkout.css',
      jsPath: '/dist/app-checkout.js',
      urlPathRegex: '/checkout',
      className: 'm-4',
      baseUrlEnvironmentVariable: 'APP_CHECKOUT_BASE_URL',
    },
    {
      disable: false,
      name: 'appFooter',
      containerId: 'app-footer',
      appPort: 6001,
      cssPath: '/dist/app-footer.css',
      jsPath: '/dist/app-footer.js',
      urlPathRegex: '/*',
      baseUrlEnvironmentVariable: 'APP_FOOTER_BASE_URL',
    },
  ],
};
