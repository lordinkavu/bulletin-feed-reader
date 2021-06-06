const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

class databaseMethods {
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
