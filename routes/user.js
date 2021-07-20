
const router = require('express').Router();
const {addSource} = require('../db');
router.post('/add/:field/:domain',async function(req,res){
    if(!req.isAuthenticated()) {
        res.sendStatus(401);
        return;
    }
    const _id = req.session.passport.user;
    try{
        const user = await addSource("users",{_id:_id,field:req.params.field},req.params.domain);
        res.json(user);
      
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
})


module.exports = router;