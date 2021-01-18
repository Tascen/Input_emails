const path = require('path');
const Htmlwebpackplugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// for prod
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
//---------



let assets_folder = path.resolve(__dirname, 'src');








module.exports = {
    mode: "production",
    entry: {
        main: [assets_folder, "js/index.jsx"].join('/')
    },
    output: {
        filename: "./[contenthash].js",
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'css-loader'
                ]
            },
            { test: /\.html$/, use: 'html-loader' },
            {
                test: /\.s[ac]ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
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
            cleanOnceBeforeBuildPatterns: ["!Photo_gallery"]
        }),
        new MiniCssExtractPlugin({
            filename: '[name]-[hash].optimize.css',
            chunkFilename: '[id].optimize.css',
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.optimize\.(css|s[ac]ss)$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default', { discardComments: { removeAll: true } }],
            },
            canPrint: true
        })

    ],
    devServer: {
        port: 4200
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
        minimize: true,
        minimizer: [new TerserPlugin()],
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