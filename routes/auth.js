const express = require("express");
const router = express.Router();
const {hash} = require('../utils/encrypt');
const {insertOne} = require("../db");
const passport = require("passport");

router.get("/signup", (req, res) => {
  res.sendStatus(200);
});

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

router.get('/login',(req,res)=>{
  res.send("Login Page");
})

router.post('/login',passport.authenticate('local',{failureRedirect:'/auth/login'}),(req,res)=>{
  res.json(req.user);
})

module.exports = router;
