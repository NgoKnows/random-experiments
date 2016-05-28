var path = require('path');
var webpack = require('webpack');
var ROOT_DIR = __dirname;

// PostCSS plugins
const cssnext = require('postcss-cssnext');
const postcssFocus = require('postcss-focus');
const postcssReporter = require('postcss-reporter');

module.exports = {
    context: ROOT_DIR,

    entry: [
        'webpack-hot-middleware/client',
        path.resolve(ROOT_DIR, 'client', 'js', 'index.js')
    ],

    // devtool: 'source-map',

    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            components: path.join(ROOT_DIR, 'client', 'js', 'components')
        }
    },

    output: {
        publicPath: '/',
        path: path.join(ROOT_DIR, 'build'),
        filename: 'bundle.js'
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
    ],

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: path.join(ROOT_DIR, 'node_modules'),
                query: {
                    presets: ['es2015', 'react', 'stage-1'],
                    plugins: ['transform-decorators-legacy'],
                    env: {
                        development: {
                            presets: ['react-hmre']
                        }
                    }
                }
            },

            {
                test: /\.(jpg|png|woff|woff2|eot|ttf|svg|otf|pdf)$/,
                loader: 'url-loader?limit=10000'
            },

            {
                test: /\.css$/,
                loader: 'style-loader!css-loader?localIdentName=[local]__[path][name]__[hash:base64:5]&modules&importLoaders=1&sourceMap!postcss-loader'
            },

            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },

    postcss: () => (
        [
            postcssFocus(), // Add a :focus to every :hover
            cssnext(),
            postcssReporter({ // Posts messages from plugins to the terminal
                clearMessages: true,
            })
        ]
    )
};
