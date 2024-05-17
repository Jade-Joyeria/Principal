const express = require('express');
const { engine } = require('express-handlebars');
const myconnection = require('express-myconnection');
const mysql = require('mysql');
const session = require('express-session');
const bodyParser = require('body-parser')

const loginRoutes = require('./routes/login');
/*const { redirect } = require('express/lib/response');*/

const app = express();
app.set('port', 4400);

app.set('views', __dirname + '/views');
app.engine('.hbs', engine({
extname: '.hbs',
}));
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(myconnection(mysql, {
host: 'localhost',
user: 'root',
password: '2374',
port: 3306,
database: 'jadejoyeria'
}));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.listen(app.get('port'), () => {
 console.log('listening on port ', app.get('port'));
});

app.use('/', loginRoutes);

app.get('/', (req, res) => {
if (req.session.loggedin == true) {
		res.render('home', { name: req.session.name });
	} else {
		res.redirect('/login');
	}
});