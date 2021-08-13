const { MongoClient, ObjectID } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

let client;
const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@bullet.xvncb.mongodb.net/bulletdb?retryWrites=true&w=majority`;

async function connect() {
  try {
    const mongodb = await MongoClient.connect(uri, {
      useUnifiedTopology: true,
    });
    client = mongodb.db("bulletdb");
    return Promise.resolve();
  } catch (e) {
    console.log(e);
    return Promise.reject();
  }
}

function get() {
  //if (!client) await connect();
  return client;
}

async function insertOne(collection, data) {
  try {
    const res = await client.collection(collection).insertOne(data);
    Promise.resolve(res);
  } catch (e) {
    Promise.reject(e);
  }
}

async function findUser(query) {
  if(query._id) query._id = new ObjectID(query._id);
  try {
    const user = await client.collection("users").findOne(query);
    return user;
  } catch (e) {
    return Promise.reject(e);
  }
}

async function addSource(_id, field, data) {
  const id = new ObjectID(_id);
  const updateObj = {};

  updateObj[field + "." + data] = true;
  try {
    const user = await client
      .collection("users")
      .findOneAndUpdate(
        { _id: id },
        { $set: updateObj },
        { returnOriginal: false }
      );
    return user;
  } catch (e) {
    return Promise.reject(e);
  }
}

async function removeSource(_id, field, data) {
  const id = new ObjectID(_id);
  const updateObj = {};

  updateObj[field + "." + data] = false;
  try {
    const user = await client
      .collection("users")
      .findOneAndUpdate(
        { _id: id },
        { $set: updateObj },
        { returnOriginal: false }
      );
    return user;
  } catch (e) {
    return Promise.reject(e);
  }
}

async function fetchDomains() {
  try {
    const domains = await client.collection("sources").distinct("domain");
    return domains;
  } catch (e) {
    return Promise.reject(e);
  }
}

async function fetchSites(domain) {
  try {
    const sites = await client.collection("sources").find({domain:domain}).toArray();
    return sites;
  } catch (e) {
    return Promise.reject(e);
  }
}



async function fetchArticles(query) {
  try {
    const articles = await client
      .collection("articles")
      .find(query)
      .sort({ pubDate: -1 })
      .limit(100)
      .toArray();
    return articles;
  } catch (e) {
    return Promise.reject(e);
  }
}

function close() {
  client.close();
}

module.exports = {
  connect,
  get,
  close,
  insertOne,
  findUser,
  addSource,
  removeSource,
  fetchArticles,
  fetchDomains,
  fetchSites
};

/* class databaseMethods {
  constructor(uri) {
    this.client = new MongoClient(uri,{ useUnifiedTopology: true });
  }
  async init() {
    try {
      await this.client.connect();
     console.log("connected to db")
    
      return Promise.resolve();
    } catch (e) {
      console.log(e.message);
      return Promise.reject();
    }
  }
  close() {
    this.client.close();
  }
}

module.exports = databaseMethods;
 */
