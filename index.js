"use strict";
const express = require("express");
const dotenv = require("dotenv");
const db = require("./db");
const cors = require("cors");
const path = require("path");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { validPassword } = require("./utils/encrypt");

const auth = require("./routes/auth");
const user = require("./routes/user");

const app = express();
dotenv.config();
const port = process.env.PORT || 8080;

//app.use(cors({ origin: true, credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: new FileStore(),
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy({ usernameField: "email" }, async function (
    email,
    password,
    done
  ) {
    try {
      const user = await db.findOne("users", { email: email });
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

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  let error = null;
  let user = null;
  db.findOne("users", { _id: id })
    .then((user) => {
      
      done(error, {email:user.email,domain:user.domain});
    })
    .catch((error) => {
     done(error, user);
    });
  /* 
  try{
    user =  await db.findOne("users",{_id:id});
  }catch(e){
    error = e;
  } */

  //done(null, { _id: "vdhsvhs", email: "test", password: "test" });
});

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

app.get("/favicon.ico", (req, res) => res.sendStatus(200));

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
