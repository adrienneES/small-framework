import express from 'express';
import open  from 'open';
import logger from 'morgan';
/* eslint-disable no-console */

var nav = [
  {link: '/authors', text: 'Author'},
  {link: '/books', text: 'Book'}
];

const port = process.argv[2] || 5001;
var app = express();

app.use(express.static('public'));
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(logger('dev', {
    skip: () => app.get('env') === 'test'
  }));

app.get('/', function(req,res) {
    res.render('index', {
      title: 'mytitle',
      nav: nav});
  });
  app.get('/books', function(req,res) {
    res.send('hi again');
  });

  // Catch 404 and forward to error handler
// must be at end - catches all else
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // Error handler
  app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    console.log('an eror happened');
    res
      .status(err.status || 500)
      .send(`error: ${err.message}`);
  });


  app.listen(port, function(err) {
    if(err) {
        console.log(err);
    } else {
        open('http://localhost:' + port);
    }
});
