const { resolve } = require('path');

export default {
    root: resolve(__dirname, 'src'),
    resolve: {
        main: resolve(__dirname, 'index.html'),
        signup: resolve(__dirname, 'signup.html'),
    },
    server: {
        port: 8080,
        hot: true,
    },
};
