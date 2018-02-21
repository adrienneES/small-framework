import express from 'express';
import open  from 'open';
import webpack from 'webpack';
import config from '../webpack.config.dev';
/* eslint-disable no-console */

var nav = [
  {link: '/authors', text: 'Author'},
  {link: '/books', text: 'Book'}
];


const port = process.argv[2] || 5001;
var app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo:true,
  publicPath: config.output.publicPath
}));

app.use(express.static('public'));
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/', function(req,res) {
    res.render('index', {
      title: 'mytitle',
      nav: nav});
  });
  app.get('/books', function(req,res) {
    res.send('hi');
  });
  app.listen(port, function(err) {
    if(err) {
        console.log(err);
    } else {
        open('http://localhost:' + port);
    }
});
