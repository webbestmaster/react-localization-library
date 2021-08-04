const {pathToDist, webpackDevServerPort} = require('./../config');

const host = 'localhost';
// const host = '192.168.147.45';

/*
const mainProxyUrlSetting = {
    // pathRewrite: {'^/!*': ''},
    secure: false,
    target: 'https://api.site.io/',
    changeOrigin: true, // for this option only: see documentations here https://github.com/chimurai/http-proxy-middleware#http-proxy-middleware-options
};
*/

module.exports.devServer = {
    host,
    port: webpackDevServerPort,
    contentBase: pathToDist,
    historyApiFallback: {
        disableDotRule: true,
    },
    // writeToDisk: isBuildServer,
    // inline: false,
    // hot: true,
    // hotOnly: false,
    disableHostCheck: true,
    // proxy: {
    //     '/reports/': mainProxyUrlSetting,
    // },
    /*
    proxy: {
        '/op/api': {
            secure: false,
            target: 'https://cp.site.io',
            changeOrigin: true,
            cookieDomainRewrite: 'localhost',
            onProxyRes: proxyResponse => {
                const {headers} = proxyResponse;

                if (!headers['set-cookie']) {
                    return;
                }

                headers['set-cookie'] = headers['set-cookie'].map(cookie => {
                    return cookie.replace(/; secure/i, '').replace(/; SameSite=None/i, '; SameSite=Strict');
                });
            },
        },
    },
*/
};
