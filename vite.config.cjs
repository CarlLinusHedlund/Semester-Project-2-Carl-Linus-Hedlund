const { resolve } = require('path');

export default {
  root: resolve(__dirname, 'src'),
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        signup: resolve(__dirname, 'src/signup/signup.html'),
        signIN: resolve(__dirname, 'src/signin/signIn.html'),
        listings: resolve(__dirname, 'src/listings.html'),
        specificProduct: resolve(__dirname, 'src/specificProduct.html'),
        profile: resolve(__dirname, 'src/dashboard/dashboard.html'),
        wallet: resolve(__dirname, 'src/dashboard/wallet.html'),
        overview: resolve(__dirname, 'src/dashboard/overview.html'),
        makeAList: resolve(__dirname, 'src/dashboard/makeAList.html'),
      },
    },
  },
  server: {
    port: 8080,
    hot: true,
  },
};
