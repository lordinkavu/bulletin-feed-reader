const express = require("express");
const router = express.Router();
const { hash } = require("../utils/encrypt");
const { insertOne } = require("../db");
const passport = require("passport");
const jwt = require("jsonwebtoken");

// Authentcation middleware
function localAuthenticate(req, res, next) {
  passport.authenticate("local", { session: false }, function (err, user) {
    if (err) return res.sendStatus(500);
    if (!user) {
      return res.sendStatus(401);
    }
    const token = jwt.sign({ _id: user._id }, "secret");
    return res.json({ token });
  })(req, res, next);
}

// Authentication routes
router.post("/signup", async (req, res) => {
  try {
    const password = await hash(req.body.password);
    const email = req.body.email;
    await insertOne("users", { email, password });
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

router.post("/login", localAuthenticate);


module.exports = router;
