const express = require('express');
const bodyParser = require('body-parser')
const axios = require('axios')
const port = process.env.PORT || 3000
const app = express();

//app.use(express.static('css/'));
//app.use(express.static('js'))

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('public')
})


app.listen(port, () => console.log(`server currently running on ${port}`))