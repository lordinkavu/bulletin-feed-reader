"use strict";
const express = require("express");
const dotenv = require("dotenv");
const db = require("./db");
const cors = require("cors");
const path = require("path");

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const {Strategy:JwtStrategy, ExtractJwt } = require("passport-jwt");

const { validPassword } = require("./utils/encrypt");

const auth = require("./routes/auth");
const user = require("./routes/user");
const articles = require("./routes/articles");
const app = express();
dotenv.config();
const port = process.env.PORT || 8080;

app.use(cors({ origin: true, credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

const JwtOptions = {
  jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey : "secret",
}

passport.use(
  new JwtStrategy( JwtOptions,  async function (
    jwt_payload,
    done
  ) {
    try {
      return done(null, {_id: jwt_payload._id});
    } catch (e) {
      return done(e);
    }
  }) 
);

passport.use(
  new LocalStrategy({ usernameField: "email" }, async function (
    email,
    password,
    done
  ) {
    try {
      
      const user = await db.findUser({ email: email });
      if (!user) {
        return done(null, false, { message: "username or password not valid" });
      }
      const isPasswordValid = await validPassword(password, user.password);
      if (!isPasswordValid)
        return done(null, false, { message: "username or password not valid" });
      
      return done(null, user);
    } catch (e) {
      return done(e);
    }
  })
);




db.connect()
  .then(() => {
    console.log("database connection established");
    app.listen(port, () => {
      console.log(`app listening on port ${port}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });

app.use("/auth", auth);
app.use("/user",user);
app.use("/articles",articles);


/* app.get("/articles/:domain", async (req, res) => {
  const cursor = db_obj.client
    .db("bulletdb")
    .collection("articles")
    .find({ domain: req.params.domain })
    .sort({ pubDate: -1 })
    .limit(50);
  const articles = await cursor.toArray();
  res.send({ articles: articles });
}); */

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}
