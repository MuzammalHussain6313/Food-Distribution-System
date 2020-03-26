const express = require('express');
const charityHouseRouter = express.Router();
const CharityHouse = require('../models/CharityHouse');

charityHouseRouter.get('/', async (req,res)=>{
    res.send("That is default page of the charityHouses endpoint.")
});

charityHouseRouter.get('/getCharityHouses', async (req, res)=>{
    const allDonations = await CharityHouse.find();
    //res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(allDonations);
});

charityHouseRouter.post('/newCharityHouse', async (req, res)=>{
    // url to access thi sis "localhost:3000/students/newStudent" not "localhost:3000/newStudent";
    //req.setHeader('Access-Control-Allow-Origin', '*');
    //res.setHeader('Access-Control-Allow-Origin', '*');
    const charityHouse1 = new CharityHouse(req.body);
    console.log('charityHouse', charityHouse1);
    const result = await charityHouse1.save();
    if (result) {
        res.send({
            message: "Student inserted successfully."
        });
    }
    res.send("Save a new student will here.");
});

charityHouseRouter.get('/:charityHouseId', async (req, res)=>{
    console.log(req.params.charityHouseId);
    const charityHouse = await CharityHouse.findById(req.params.charityHouseId);
    res.json(charityHouse);
});

charityHouseRouter.patch('/:charityHouseId', async (req, res)=>{
    console.log('id body', req.body);
    console.log('id recieve', req.params.charityHouseId);
    var charityHouse = req.body;
    const updatedCharityHouse = await CharityHouse.updateOne(
        { _id: req.params.charityHouseId},
        { $set: charityHouse });
    res.send(updatedcharityHouse);
});

charityHouseRouter.delete('/:deleteCharityHouse', async (req, res) => {
    try {
        console.log('body ' + req.body);
        const result = await CharityHouse.remove({ _id: req.params.deleteCharityHouse});
        if (result) {
            res.send({
                massage: 'CharityHouse deleted Successfully.'
            });
        }
    } catch (ex) {
        console.log('ex', ex);
        res.send({message: 'Error'}).status(401);
    }
});

module.exports = charityHouseRouter;
