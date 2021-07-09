const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

let client;
const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@bullet.xvncb.mongodb.net/bulletdb?retryWrites=true&w=majority`;

async function connect() {
  try {
    const mongodb = await MongoClient.connect(uri, { useUnifiedTopology: true });
    client = mongodb.db('bulletdb');
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

async function insertOne(collection,data){
  try{
    const res = await client.collection(collection).insertOne(data);
    Promise.resolve(res);
  }catch(e){
    Promise.reject(e);
  }
  
}

async function findOne(collection,query){
  try{
    const user = await client.collection(collection).findOne(query);
    return user;
  }catch(e){
    return Promise.reject(e);
  }
}

function close() {
  mongodb.close();
}

module.exports = {
  connect,
  get,
  close,
  insertOne,
  findOne
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
