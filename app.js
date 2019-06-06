const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();

process.env.SECRET = "H+MbQeThWmZq4t6w9z$C&F)J@NcRfUjX";

const apiRoutes = require('./routes/api');

//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'sfa-react', 'build')));

app.use(cookieParser());

app.use('/api', apiRoutes);
app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, 'sfa-react', 'build', 'index.html'));
})

app.listen(3000);