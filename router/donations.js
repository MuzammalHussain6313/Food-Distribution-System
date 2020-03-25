const jsonwebtoken = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcryptjs');
const donationRouter = express.Router();
const Donation = require('../models/Donation');

donationRouter.get('/', async (req,res)=>{
    res.send("That is default page of the donations endpoint.")
});

donationRouter.get('/getDonations', async (req, res)=>{
    const allDonations = await Donation.find();
    //res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(allDonations);
});

donationRouter.post('/newDonation', async (req, res)=>{
    // url to access thi sis "localhosta:3000/students/newStudent" not "localhost:3000/newStudent";
    //req.setHeader('Access-Control-Allow-Origin', '*');
    //res.setHeader('Access-Control-Allow-Origin', '*');
    const donation1 = new Donation(req.body);
    console.log('donation', donation1);
    const result = await donation1.save();
    if (result) {
        res.send({
            message: "Student inserted successfully."
        });
    }
    res.send("Save a new student will here.");
});

donationRouter.get('/:donationId', async (req, res)=>{
    console.log(req.params.donationId);
    const donation = await Donation.findById(req.params.donationId);
    res.json(donation);
});

donationRouter.patch('/:donationId', async (req, res)=>{
    console.log('id body', req.body);
    console.log('id recieve', req.params.donationId);
    var donation = req.body;
    const updatedDonation = await Donation.updateOne(
        { _id: req.params.donationId},
        { $set: donation });
    res.send(updateddonation);
});

donationRouter.delete('/:deleteDonation', async (req, res) => {
    try {
        console.log('body ' + req.body);
        const result = await Donation.remove({ _id: req.params.deleteDonation});
        if (result) {
            res.send({
                massage: 'Donation deleted Successfully.'
            });
        }
    } catch (ex) {
        console.log('ex', ex);
        res.send({message: 'Error'}).status(401);
    }
});

module.exports = donationRouter;
