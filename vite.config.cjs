const { resolve } = require('path');

export default {
  base: '/Semester-Project-2-Carl-Linus-Hedlund/',
  root: resolve(__dirname, 'src'),
  resolve: {
    main: resolve(__dirname, 'index.html'),
    signup: resolve(__dirname, 'signup/signup.html'),
    signIN: resolve(__dirname, 'signin/signIn.html'),
    listings: resolve(__dirname, 'listings.html'),
    specificProduct: resolve(__dirname, 'specificProduct.html'),
    profile: resolve(__dirname, 'dashboard/dashboard.html'),
    wallet: resolve(__dirname, 'dashboard/wallet.html'),
    overview: resolve(__dirname, 'dashboard/overview.html'),
    makeAList: resolve(__dirname, 'dashboard/makeAList.html'),
  },
  server: {
    port: 8080,
    hot: true,
  },
};
