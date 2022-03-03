const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();

dotenv.config({path: './config.env'});
// const SignPatient = require('./model/SignPatient');
// const SignDonor = require('./model/SignDonor');
// const SignHospital = require('./model/SignHospital');

const port = process.env.PORT;

require('./db/conn');

app.use(express.json());

app.use(require('./router/auth'));


app.listen(port,()=>{
    console.log(`Example app listening at http://localhost:${port}`);
});

