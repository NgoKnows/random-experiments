import Koa from 'koa';
import convert from 'koa-convert';
const app = new Koa();

// Webpack and Hot Module Reloading :)
// --------------------------------------------------
import webpackDevMiddleware from 'koa-webpack-dev-middleware';
import webpackHotMiddleware from 'koa-webpack-hot-middleware';

import webpack from 'webpack';

let config;
if (process.env.NODE_ENV !== 'production') {
    config = require('./webpack.config.dev');
} else {
    config = require('./webpack.config.prod');
}

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

// Routing
// --------------------------------------------------
import send from 'koa-send';

// catches any request that isn't handled by koa-static or koa-router
app.use(async (ctx) => {
    await send(ctx, 'client/index.html');
});

// Start Server
// --------------------------------------------------
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.info('App is listening on port', port);
});
