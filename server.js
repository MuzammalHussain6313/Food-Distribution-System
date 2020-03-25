const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fyp', {useNewUrlParser: true}, ()=>console.log('connected'));

// mongoose.connect('mongodb+srv://muzammal6313:ashrafi9885@cluster0-4hc2l.mongodb.net/studentDB?retryWrites=true&w=majority',
//     {useNewUrlParser: true}).then(() => console.log('connected')).catch(err =>{
//     console.log(err);});

const cors = require('cors');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const userRoute = require('./router/users');

//app.use('/router')(router);
app.use('/users', userRoute);

app.get('/', (req, res) => {
    res.send('hello world');
});

app.listen(process.env.PORT || 5000, () => {
    console.log('Express application running on ');
});

