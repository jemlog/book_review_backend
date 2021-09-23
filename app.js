const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');
const passportConfig = require('./passport')
const {sequelize} = require('./models');
const passport = require('passport');
const authRouter = require('./router/auth')
const indexRouter = require('./router/index')
const postRouter = require('./router/post')
dotenv.config();


const app = express();
app.set('port', process.env.PORT || 8003);
app.set('view engine', 'html');
nunjucks.configure('views', {
  express: app,
  watch: true,
});
passportConfig()

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname,'uploads')))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));
sequelize.sync({force : false}).then(()=>{
  console.log('db start...')
})
.catch(err=>{console.error(err)})

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter)
app.use('/auth',authRouter)
app.use('/post',postRouter)

app.use((req, res, next) => {
  const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message; 
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), 'jemin api server');
});
