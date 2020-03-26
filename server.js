const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/fyp', {useNewUrlParser: true}, ()=>console.log('connected'));

mongoose.connect('mongodb+srv://muzammalbsse:muzammalbsse@online-cluster-kylqc.mongodb.net/foodDB?retryWrites=true&w=majority',
     {useNewUrlParser: true}).then(() => console.log('connected')).catch(err =>{
     console.log(err);});

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
const restaurantRoute = require('./router/restaurants');
const foodRoute = require('./router/foods');
const donationRoute = require('./router/donations');
const charityhouseRoute = require('./router/charityHouses');
//app.use('/router')(router);
app.use('/users', userRoute);
app.use('/restaurants', restaurantRoute);
app.use('/foods', foodRoute);
app.use('/donations', donationRoute);
app.use('/charityHouses', charityhouseRoute);
app.get('/', (req, res) => {
    res.send('hello world');
});

app.listen(process.env.PORT || 5000, () => {
    console.log('Express application running on ');
});

