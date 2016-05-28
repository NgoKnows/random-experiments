const path = require('path');

module.exports = {
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader?localIdentName=[local]__[path][name]__[hash:base64:5]&modules&importLoaders=1&sourceMap!postcss-loader'
            }
        ]
    },

    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            components: path.resolve('client', 'js', 'components')
        }
    },
};
