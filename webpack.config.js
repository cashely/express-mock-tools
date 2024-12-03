module.exports = {
    entry: './index.js',
    output: {
        path: __dirname,
        filename: 'index.min.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    devtool:'source-map',
    mode: 'development',
    target: 'node'
}