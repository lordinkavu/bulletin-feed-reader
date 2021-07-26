const router = require("express").Router();
const {fetchDomains, fetchArticles} = require('../db');
router.get('/domains',async(req,res)=>{
    try{
        const domains = await fetchDomains();
        res.json(domains);
    }catch(e){
        res.sendStatus(500);
    }
   
   
})

router.get('/domain/:name', async(req,res)=>{
    try{
        const articles = await fetchArticles({domain:req.params.name});
        res.json(articles);

    }catch(e){
        res.sendStatus(500);
    }
})


module.exports = router;