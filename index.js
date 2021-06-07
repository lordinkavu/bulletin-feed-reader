"use strict";
const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const db = require("./db/db-methods");
const cors = require("cors");
const path = require("path");
const port = process.env.PORT || 8080;

app.use(cors({ origin: true, credentials: true }));
const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@bullet.xvncb.mongodb.net/bulletdb?retryWrites=true&w=majority`;
const db_obj = new db(uri);

db_obj
  .init()
  .then(() => {
    app.listen(port, () => {
      console.log(`app listening on port ${port}`);
    });
    
  })
  .catch((e) => {
    console.log(e);
  });

app.get("/articles/:domain", async (req, res) => {
  const cursor = db_obj.client
    .db("bulletdb")
    .collection("articles")
    .find({ domain: req.params.domain })
    .sort({ pubDate: -1 })
    .limit(50);
  const articles = await cursor.toArray();
  res.send({ articles: articles });
});

app.use(express.static(path.join(__dirname, "client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});



