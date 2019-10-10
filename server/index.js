const express = require('express');
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser');
//const db = require('./model/db');
//const router = express.Router();


//controller
const userController = require('./controllers/userController')
const trainingController = require('./controllers/trainingController')

//validate
const userValidate = require('./middlewave/userValidate')

// values
const port = process.env.port || 3000;

//body
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));


app.use('/users', userController);
app.use('/training', trainingController);



app.listen(port, () => {
    console.log("Server listing port " + port)
});