const path = require('path');

module.exports = {
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            components: path.resolve('client', 'js', 'components')
        }
    },
};
