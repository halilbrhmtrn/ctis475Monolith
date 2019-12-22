const express = require('express');
const session = require('express-session');

const app = express();
const authRoutes = require('./routes/authRoute');
const blogRoutes = require('./routes/blogRoute');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('src/public'));

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(session({
  secret: 'some random secret',
  resave: false,
  saveUninitialized: true
}));

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

app.get('/', (req, res, next) => {
  res.redirect('/blogs');
});

authRoutes(app);
blogRoutes(app);

app.listen(8080, () => {
  console.log('Listening on port 8080!');
});
