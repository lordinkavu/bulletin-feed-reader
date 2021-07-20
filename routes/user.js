
const router = require('express').Router();
const {addSource} = require('../db');
router.post('/add/:field/:domain',async function(req,res){
    if(!req.isAuthenticated()) {
        res.sendStatus(401);
        return;
    }
    const _id = req.session.passport.user;
    try{
        const data = await addSource("users",{_id:_id,field:req.params.field},req.params.domain);
        const user = data.value;
        console.log(data.value);
        res.json({email:user.email,domain:user.domain});
      
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
})


module.exports = router;