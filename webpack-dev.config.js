const path = require('path');
const Htmlwebpackplugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')



let assets_folder = path.resolve(__dirname, 'src');



module.exports = {
    mode: "development",
    devtool: 'inline-source-map',
    entry: {
        main: [assets_folder, "js/index.jsx"].join('/')
    },
    output: {
        filename: "./[name]-[contenthash].js",
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            { test: /\.html$/, use: 'html-loader' },
            {
                test: /\.s[ac]ss$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" },
                    { loader: "sass-loader" }
                ]
            },
            {
                test: /\.(test.ts|ts)$/,
                exclude: /node_modules/,
                loader: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            '@babel/preset-env',
                            "@babel/preset-typescript"
                        ]
                    }
                }
            },
            {
                test: /\.(test.js|js)$/,
                exclude: /node_modules/,
                loader: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ]
                    }
                }
            }
        ]
    },
    plugins: [
        new Htmlwebpackplugin({
            template: [assets_folder, "index.html"].join('/'),
            chunks: ['main']
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['!index.html']
        }),
        new BundleAnalyzerPlugin()
    ],
    devServer: {
        port: 4200
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    resolve: {
        extensions: [
            '.Webpack.js', '.web.js',
            '.js', '.ts',
            '.html',
            '.css', '.scss', '.sass'
        ],
        alias: {
            '@styles': path.join(assets_folder, 'style'),
            '@main_file_js': path.join(assets_folder, 'js'),
            '@images': path.join(assets_folder, 'images')
        }
    },
}