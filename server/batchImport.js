const { createReadStream } = require("fs");
const { MongoClient } = require("mongodb");
const shops = require("./data/shops.json");

// const path = require("path");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

const batchImport = async () => {
  //adds a random rating to each flavour of ice cream
  shops.forEach(shop => {
    shop.iceCreams.forEach(iceCream => {
      iceCream.rating = (Math.round(Math.random() * 9) + 1) / 2;
    });
  });

  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("final-project");
    await db.collection("shops").insertMany(shops);
    client.close();
  } catch (err) {
    console.log(err.message);
  }
};

batchImport();
