const jsonwebtoken = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcryptjs');
const charitHouseRouter = express.Router();
const CharitHouse = require('../models/CharitHouse');

charitHouseRouter.get('/', async (req,res)=>{
    res.send("That is default page of the charitHouses endpoint.")
});

charitHouseRouter.get('/getCharitHouses', async (req, res)=>{
    const allCharitHouses = await CharitHouse.find();
    //res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(allCharitHouses);
});

charitHouseRouter.post('/newCharitHouse', async (req, res)=>{
    // url to access thi sis "localhosta:3000/students/newStudent" not "localhost:3000/newStudent";
    //req.setHeader('Access-Control-Allow-Origin', '*');
    //res.setHeader('Access-Control-Allow-Origin', '*');
    const charitHouse1 = new CharitHouse(req.body);
    console.log('charitHouse', charitHouse1);
    const result = await charitHouse1.save();
    if (result) {
        res.send({
            message: "Student inserted successfully."
        });
    }
    res.send("Save a new student will here.");
});

charitHouseRouter.get('/:charitHouseId', async (req, res)=>{
    console.log(req.params.charitHouseId);
    const charitHouse = await CharitHouse.findById(req.params.charitHouseId);
    res.json(charitHouse);
});

charitHouseRouter.patch('/:charitHouseId', async (req, res)=>{
    console.log('id body', req.body);
    console.log('id recieve', req.params.charitHouseId);
    var charitHouse = req.body;
    const updatedCharitHouse = await CharitHouse.updateOne(
        { _id: req.params.charitHouseId},
        { $set: charitHouse });
    res.send(updatedcharitHouse);
});

charitHouseRouter.delete('/:deleteCharitHouse', async (req, res) => {
    try {
        console.log('body ' + req.body);
        const result = await CharitHouse.remove({ _id: req.params.deleteCharitHouse});
        if (result) {
            res.send({
                massage: 'CharitHouse deleted Successfully.'
            });
        }
    } catch (ex) {
        console.log('ex', ex);
        res.send({message: 'Error'}).status(401);
    }
});

module.exports = charitHouseRouter;
