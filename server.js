const express = require('express');
const path = require('path');
const http = require('http');
import config from './webpack.config.dev';
import webpack from 'webpack';
import open from 'open';
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || '3002';
const db = require('./server/db').mongoConnection;

// Get our API routes
const api = require('./server/routes/api');

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/index.html'))
});
	
db.connect().then(() => {
    app.listen(port);	
    console.log('Magic happens on port ' + port);
    open(`http://localhost:${port}`);
})
