const { resolve } = require('path');

export default {
    root: resolve(__dirname, 'src'),
    resolve: {
        main: resolve(__dirname, 'src/index.html'),
    },
    server: {
        port: 8080,
        hot: true,
    },
};
