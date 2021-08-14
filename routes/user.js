const router = require("express").Router();
const { editUserSites, fetchArticles, findUser } = require("../db");
const passport = require('passport');
const { ObjectID } = require("mongodb");

router.use(passport.authenticate('jwt',{session:false}));

router.get('/',(req,res)=>{
  console.log(req.user);
  res.sendStatus(200);
});

router.get('/sites' , async(req,res)=>{
  try{
    const user = await findUser({_id:req.user._id});
    res.json(user.site);
  }catch(e){
    res.sendStatus(404);
  }
})

router.put('/sites', async(req,res)=>{
  try{
    const user = await editUserSites({_id:req.user._id}, req.body.sites);
    res.json(user.site);
  }catch(e){
    res.sendStatus(501);
  } 
})

module.exports = router;
