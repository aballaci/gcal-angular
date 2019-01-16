const path = require('path');

module.exports = {
    mode: 'development',
    target: 'node',
    entry: {
        app: './lib/server.ts'
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    devServer: {
        contentBase: './dist'
    },
    output: {
        filename: 'rest.bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};
