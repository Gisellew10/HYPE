console.log('Server-side code running')
const express = require('express')
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routesHandler = require('./routes/handler.js');

const app = express()

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/', routesHandler);

app.use(express.static('public'))

require('dotenv').config()
const connectionString = process.env.DB_STRING

mongoose.connect(connectionString,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
.then( () => {
    console.log('DB Connected!');
})
.catch( (err) => {
    console.log(err);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}.`);
});
