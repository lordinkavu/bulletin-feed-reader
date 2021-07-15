const express = require("express");
const router = express.Router();
const {hash} = require('../utils/encrypt');
const {insertOne} = require("../db");
const passport = require("passport");



router.post("/signup", async (req, res) => {
  try {
    const password = await hash(req.body.password);
    const email = req.body.email;
    await insertOne("users",{email,password});
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.send(e);
  } 
});



router.post('/login', function(req,res,next){
  passport.authenticate('local',function(err,user,info){
    if(err) return res.status(400).send({message:"Unexpected error"});
    if(!user) return res.status(400).send({message:"email or password not correct"});
    req.login(user,function(err){
      if(err){
        return res.status(500).send({message:"Unexpected error. Please try again"});
      }
      return res.status(200).json(user);
    })


  })(req,res,next)
})

module.exports = router;
