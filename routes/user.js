const router = require("express").Router();
const { addSource, removeSource, fetchArticles } = require("../db");

router.use(function authorize(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.sendStatus(401);
  }
});

router.patch("/add/:field/:_id", async function (req, res) {
  
  const _id = req.session.passport.user;


  try {
    const data = await addSource(
    
      _id,
      req.params.field,
      req.params._id
    );
    const user = data.value;

    res.json({ email: user.email, site: user.site });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.patch("/remove/:field/:_id", async function (req, res) {
  const _id = req.session.passport.user;
  try {
    const data = await removeSource(
      
      _id,
      req.params.field,
      req.params._id
    );
    const user = data.value;

    res.json({ email: user.email, site: user.site });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/feed/:domain", async (req, res) => {
    const user = req.user;
    const domain_list=[];
    for(const prop in user.domain){
      if(user.domain[prop]===true) domain_list.push(prop);
    }
    const articles  = await fetchArticles(domain_list);
    
    res.json(articles);
});

module.exports = router;
