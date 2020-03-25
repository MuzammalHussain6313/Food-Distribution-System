const jsonwebtoken = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcryptjs');
const userRouter = express.Router();
const User = require('../models/User');

userRouter.get('/', async (req,res)=>{
  res.send("That is default page of the Users endpoint.")
});
userRouter.post('/signup', async (req, res) => {

  try{
    const body = req.body;
    var salt = await bcrypt.genSaltSync(10);
    const password = await body.password;
    var hash = bcrypt.hashSync(password, salt);

    console.log('hash - > ', hash);
    //console.log('body ===== ', req.body);
    body.password = hash;
    const user = new User(body);
    console.log('user', user);
    const result = await user.save();
    res.send({
      message: 'User signup successful'
    });
  }
  catch(ex){
    console.log('ex',ex)
    res.send({
      message: 'Error',
      detail: ex
    }).status(500);
  }
});

userRouter.post('/login', async (req, res) => {
  try {
    const body = req.body;
    const email = body.email;
    // lets check if email exists
    const result = await User.findOne({ email: email });
    //result.password = undefined;

    if (!result) {
      // this means result is null
      res.status(401).send({
        Error: 'This user doesnot exists. Please signup first'
      });
    } else {
      // email did exist
      // so lets match password
      if ( bcrypt.compareSync(body.password, result.password)) {
        // great, allow this user access
        console.log('match');
        //delete result['password']; //It is not working so, I'm using
        result.password = undefined;
        console.log('pass', result.password);
        const token = jsonwebtoken.sign({
          data: result,
          role: 'User'
        }, 'supersecretToken', { expiresIn: '7d' });
        console.log('token -> ', token);

        res.send({ message: 'Successfully Logged in', token: token });
      } else {
        console.log('password does not match');
        res.status(401).send({ message: 'Wrong email or Password' });
      }
    }
  } catch (ex) {
    console.log('ex', ex);
  }
});

userRouter.get('/getUsers', async (req, res)=>{
  const allUsers = await User.find();
  //res.setHeader('Access-Control-Allow-Origin', '*');
  res.send(allUsers);
});

userRouter.post('/newUser', async (req, res)=>{
  // url to access thi sis "localhosta:3000/students/newStudent" not "localhost:3000/newStudent";
  //req.setHeader('Access-Control-Allow-Origin', '*');
  //res.setHeader('Access-Control-Allow-Origin', '*');
  const user1 = new User(req.body);
  console.log('user', user1);
  const result = await user1.save();
  if (result) {
    res.send({
      message: "Student inserted successfully."
    });
  }
  res.send("Save a new student will here.");
});

userRouter.get('/:userId', async (req, res)=>{
  console.log(req.params.userId);
  const user = await User.findById(req.params.userId);
  res.json(user);
});

userRouter.patch('/:userId', async (req, res)=>{
  console.log('id body', req.body);
  console.log('id recieve', req.params.userId);
  var user = req.body;
  const updatedUser = await User.updateOne(
    { _id: req.params.userId},
    { $set: user });
  res.send(updatedUser);
});

userRouter.delete('/:deleteUser', async (req, res) => {
  try {
    console.log('body ' + req.body);
    const result = await User.remove({ _id: req.params.deleteUser});
    if (result) {
      res.send({
        massage: 'User deleted Successfully.'
      });
    }
  } catch (ex) {
    console.log('ex', ex);
    res.send({message: 'Error'}).status(401);
  }
});

module.exports = userRouter;
