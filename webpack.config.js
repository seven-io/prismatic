const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: './src/index.ts',
    mode: 'production',
    module: {
        rules: [
            {
                sideEffects: false,
            },
            {
                exclude: /node_modules/,
                test: /\.ts/,
                use: 'ts-loader',
            },
        ],
    },
    optimization: {
        usedExports: true,
    },
    output: {
        filename: 'index.js',
        libraryTarget: 'commonjs2',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: 'assets',
                    to: path.resolve(__dirname, 'dist')
                },
                {
                    from: '*.wsdl',
                    noErrorOnMissing: true,
                    to: path.resolve(__dirname, 'dist'),
                },
            ],
        }),
    ],
    resolve: {
        extensions: ['.ts', '.js'],
    },
    target: 'node',
}
