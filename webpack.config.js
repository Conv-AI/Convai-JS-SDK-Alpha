const path = require('path');

const LIB_BASE_CONFIG = {
    entry: "./src/convai_client.ts",
    mode: "production",
    module: {
        rules: [{
            test: /\.ts?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
};
const DIST_DIR = path.resolve(__dirname, 'dist');

module.exports = [{
    name: 'lib-commonjs',
    ...LIB_BASE_CONFIG,
    target: 'node',
    output: {
        path: DIST_DIR,
        filename: `convai-web-client.js`,
        libraryTarget: 'commonjs',
        globalObject: 'this'
    }
},
{
    name: 'lib-umd',
    ...LIB_BASE_CONFIG,
    target: 'web',
    output: {
        path: DIST_DIR,
        filename: `convai-web-client.umd.js`,
        libraryTarget: 'umd',
        globalObject: 'this'
    }
},
{
    name: 'lib-min',
    ...LIB_BASE_CONFIG,
    target: 'web',
    output: {
        path: DIST_DIR,
        filename: `convai-web-client.min.js`,
        library: 'convai',
        libraryTarget: 'umd'
    }
}];