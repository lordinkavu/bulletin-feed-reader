const router = require("express").Router();
const { addSource, removeSource, fetchArticles } = require("../db");

router.use(function authorize(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.sendStatus(401);
  }
});

router.post("/add/:field/:domain", async function (req, res) {
  const _id = req.session.passport.user;
  try {
    const data = await addSource(
    
      _id,
      req.params.field,
      req.params.domain
    );
    const user = data.value;

    res.json({ email: user.email, domain: user.domain });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post("/remove/:field/:domain", async function (req, res) {
  const _id = req.session.passport.user;
  try {
    const data = await removeSource(
      
      _id,
      req.params.field,
      req.params.domain
    );
    const user = data.value;

    res.json({ email: user.email, domain: user.domain });
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
