const router = require("express").Router();
const {fetchDomains, fetchArticles, fetchSites} = require('../db');

router.get('/domains',async(req,res)=>{
    try{
        const domains = await fetchDomains();
        res.json(domains);
    }catch(e){
        res.sendStatus(500);
    }
   
   
});

router.get('/sites/:domain', async(req,res)=>{
    try{
        const sites = await fetchSites(req.params.domain);
        res.json(sites);
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