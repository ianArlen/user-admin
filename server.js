require('dotenv').config({"path": `.env.${process.env.NODE_ENV}`})
const express = require('express');
const conexiondb = require('./db/conexion.js')
const path = require('path');
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const app = express();
const port = process.env.port
const db_host = process.env.DB_HOST
conexiondb(db_host)
const usuarios = require('./routes/usuarios.js')
/*
//Setting
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));*/
/*app.set('view engine', '.hbs');
*/
//Middlewares
app.use(express.urlencoded({extended: false}));
/*app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecretapp',
    resave: true, 
    saveUninitialized: true
}))
*/
app.use(express.json({extended:false}));

//Routers
app.use(require('./routes/usuarios'))

//Static files
app.use(express.static(path.join(__dirname,'public')));







app.listen(port, () => console.log(`app listening at http://localhost:${port}`));