const express = require("express");
const router = express.Router();
const { hash } = require("../utils/encrypt");
const { insertOne } = require("../db");
const passport = require("passport");

// Authentcation middleware

function authenticate(req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err) return res.sendStatus(500);
    if (!user) {
      return res.sendStatus(401);
    }

    req.login(user, function (err) {
      if (err) return res.sendStatus(500);

      return next();
    });
  })(req, res, next);
}

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

router.post("/login", authenticate, (req, res) => {
  const user = req.user;
  res.json({ _id: user._id, email: user.email });
});

router.get("/check", (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.sendStatus(401);
  }
});

module.exports = router;
