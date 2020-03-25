const jsonwebtoken = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcryptjs');
const restaurantRouter = express.Router();
const Restaurant = require('../models/Restaurant');

restaurantRouter.get('/', async (req,res)=>{
    res.send("That is default page of the restaurants endpoint.")
});

restaurantRouter.get('/getRestaurants', async (req, res)=>{
    const allRestaurants = await Restaurant.find();
    //res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(allRestaurants);
});

restaurantRouter.post('/newRestaurant', async (req, res)=>{
    // url to access thi sis "localhosta:3000/students/newStudent" not "localhost:3000/newStudent";
    //req.setHeader('Access-Control-Allow-Origin', '*');
    //res.setHeader('Access-Control-Allow-Origin', '*');
    const restaurant1 = new Restaurant(req.body);
    console.log('restaurant', restaurant1);
    const result = await restaurant1.save();
    if (result) {
        res.send({
            message: "Student inserted successfully."
        });
    }
    res.send("Save a new student will here.");
});

restaurantRouter.get('/:restaurantId', async (req, res)=>{
    console.log(req.params.restaurantId);
    const restaurant = await Restaurant.findById(req.params.restaurantId);
    res.json(restaurant);
});

restaurantRouter.patch('/:restaurantId', async (req, res)=>{
    console.log('id body', req.body);
    console.log('id recieve', req.params.restaurantId);
    var restaurant = req.body;
    const updatedRestaurant = await Restaurant.updateOne(
        { _id: req.params.restaurantId},
        { $set: restaurant });
    res.send(updatedRestaurant);
});

restaurantRouter.delete('/:deleteRestaurant', async (req, res) => {
    try {
        console.log('body ' + req.body);
        const result = await Restaurant.remove({ _id: req.params.deleteRestaurant});
        if (result) {
            res.send({
                massage: 'Restaurant deleted Successfully.'
            });
        }
    } catch (ex) {
        console.log('ex', ex);
        res.send({message: 'Error'}).status(401);
    }
});

module.exports = restaurantRouter;
