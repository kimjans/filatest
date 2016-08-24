'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _webpackDevServer = require('webpack-dev-server');

var _webpackDevServer2 = _interopRequireDefault(_webpackDevServer);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _index = require('./routes/index');

var _index2 = _interopRequireDefault(_index);

var _ejsLocals = require('ejs-locals');

var _ejsLocals2 = _interopRequireDefault(_ejsLocals);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _posts = require('./routes/posts');

var _posts2 = _interopRequireDefault(_posts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var port = 3000;
var devPort = 3001;

if (process.env.NODE_ENV == 'development') {
  console.log('Server is running on development mode');

  var config = require('../webpack.dev.config');
  var compiler = (0, _webpack2.default)(config);
  var devServer = new _webpackDevServer2.default(compiler, config.devServer);
  devServer.listen(devPort, function () {
    console.log('webpack-dev-server is listening on port', devPort);
  });
}

app.set('views', _path2.default.join(__dirname, '../views'));
app.engine('ejs', _ejsLocals2.default);
app.set('view engine', 'ejs');

app.use(_express2.default.static(_path2.default.join(__dirname, '../public')));

app.use('/', _index2.default);

app.get('/hello', function (req, res) {
  return res.send('Can you hear me?');
});

app.use('/posts', _posts2.default);

var server = app.listen(port, function () {
  console.log('Express listening on port', port);
});