const express = require('express');
const foodRouter = express.Router();
const Food = require('../models/Food');

foodRouter.get('/', async (req,res)=>{
    res.send("That is default page of the foods endpoint.")
});

foodRouter.get('/getFoods', async (req, res)=>{
    const allFoods = await Food.find();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(allFoods);
});

foodRouter.post('/newFood', async (req, res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    const food1 = new Food(req.body);
    console.log('food', food1);
    console.log('expiry date', req.body.expiry_date)
    const result = await food1.save();
    if (result) {
        res.send({
            message: "a new Food inserted successfully."
        });
    }
    res.send(food1);
});

foodRouter.get('/:foodId', async (req, res)=>{
    console.log(req.params.foodId);
    const food = await Food.findById(req.params.foodId);
    res.json(food);
});

foodRouter.patch('/:foodId', async (req, res)=>{
    console.log('id body', req.body);
    console.log('id recieve', req.params.foodId);
    var food = req.body;
    const updatedFood = await Food.updateOne(
        { _id: req.params.foodId},
        { $set: food });
    res.send(updatedFood);
});

foodRouter.delete('/:deleteFood', async (req, res) => {
    try {
        console.log('body ' + req.body);
        const result = await Food.remove({ _id: req.params.deleteFood});
        if (result) {
            res.send({
                massage: 'Food deleted Successfully.'
            });
        }
    } catch (ex) {
        console.log('ex', ex);
        res.send({message: 'Error'}).status(401);
    }
});

module.exports = foodRouter;
