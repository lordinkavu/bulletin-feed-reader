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

router.get('/sites', async(req,res)=>{
    try{
        const sites = await fetchSites(req.query.domain);
        res.json(sites);
    }catch(e){
        res.sendStatus(500);
    }
})

router.get('/', async(req,res)=>{
    const query = {};
    if(req.query.domain) query.domain = req.query.domain;
    try{
        const articles = await fetchArticles(query);
        res.json(articles);

    }catch(e){
        res.sendStatus(500);
    }
})


module.exports = router;