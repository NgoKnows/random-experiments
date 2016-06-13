import Koa from 'koa';
import convert from 'koa-convert';
const app = new Koa();

// Webpack and Hot Module Reloading :)
// --------------------------------------------------
import webpackDevMiddleware from 'koa-webpack-dev-middleware';
import webpackHotMiddleware from 'koa-webpack-hot-middleware';

import webpack from 'webpack';

const config = require('./webpack.config');
const compiler = webpack(config);

app.use(convert(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
})));

if (process.env.NODE_ENV !== 'production') {
    app.use(convert(webpackHotMiddleware(compiler)));
}

// Serve Static Files
// --------------------------------------------------
import path from 'path';
import serve from 'koa-static';

app.use(convert(serve(path.resolve('client'))));


// Start Server
// --------------------------------------------------
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.info('App is listening on port', port);
});
