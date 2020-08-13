require('dotenv').config({"path": `.env.${process.env.NODE_ENV}`})
const express = require('express');
const conexiondb = require('./db/conexion.js')
const app = express();
const port = process.env.port
const db_host = process.env.db_host
conexiondb(db_host)
const usuarios = require('./routes/usuarios.js')

app.use(express.json({extended:false}));
app.use('/usuarios',usuarios)



app.listen(port, () => console.log(`app listening at http://localhost:${port}`));