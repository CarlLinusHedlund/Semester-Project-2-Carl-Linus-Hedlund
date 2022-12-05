const { resolve } = require('path');

export default {
    root: resolve(__dirname, 'src'),
    resolve: {
        main: resolve(__dirname, 'index.html'),
        signup: resolve(__dirname, 'signup.html'),
        signIN: resolve(__dirname, 'signIn.html'),
        listings: resolve(__dirname, 'listings.html'),
    },
    server: {
        port: 8080,
        hot: true,
    },
};
