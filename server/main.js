import express from 'express';
import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import router from './routes/index';
import engine from "ejs-locals";
import path from "path";
 
const app = express();
const port = 3000;
const devPort = 3001;
 
 
if(process.env.NODE_ENV == 'development') {
    console.log('Server is running on development mode');
 
    const config = require('../webpack.dev.config');
    let compiler = webpack(config);
    let devServer = new WebpackDevServer(compiler, config.devServer);
    devServer.listen(devPort, () => {
        console.log('webpack-dev-server is listening on port', devPort);
    });
}

app.set('views', path.join(__dirname, '../views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '../public')));

app.use('/', router);
 
app.get('/hello', (req, res) => {
    return res.send('Can you hear me?');
});
 
 
import posts from './routes/posts';
app.use('/posts', posts);
 
const server = app.listen(port, () => {
    console.log('Express listening on port', port);
});