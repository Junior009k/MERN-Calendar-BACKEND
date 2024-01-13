const express = require('express');
const {dbConnection}=require('./database/config')
const cors=require('cors')
require('dotenv').config();

//Crear el servidor de express
const app= express();

//Directorio Publico
app.use(express.static('public'));

//DB Conection
dbConnection();

//uso del cors
app.use(cors())
//lectura y parseo del body
app.use(express.json())

app.use('/api/auth',require('./routes/auth'));
app.use('/api/events',require('./routes/events'));
app.get('*',(req,res)=>{
    res.sendFile(__dirname + '')
})
//TODO:auto //crear, login, renew
//TODO: CRUD, Eventos

//escuchar peticiones
app.listen(process.env.PORT,()=>{
    console.log(`servidor corriendo en puerto ${process.env.PORT}`)
})