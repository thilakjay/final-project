const { createReadStream } = require("fs");
const { MongoClient } = require("mongodb");
const shops = require("./data/shops.json");
const iceCreams = require("./data/ice-creams.json");

// const path = require("path");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

const { v4: uuidv4 } = require("uuid");

const batchImport = async () => {
  //adds a random rating and _id to each flavour of ice cream
  iceCreams.forEach(iceCream => {
      const _id = uuidv4();
      iceCream.reviews = [
        {
          name: "Homer Simpson",
          review: "Marriage is like soft-serve ice cream. And trust is the hard chocolate shell that keeps it from melting onto our carpet.",
          userRating: 5
        }, 
        {
          name: "Wayne Gretzky",
          review: "You miss 100% of the ice cream you don't scoop",
          userRating: 5
        },
        {
          name: "Eddie Murphy",
          review: `There's something about the icecream truck that makes kids lose it. 
                    And they can hear that sh*t from ten blocks away. They don't hear 
                    their mothers calling, but they hear that ice cream truck.`,
          userRating: 4.5
        },        
      ];

      iceCream._id = _id;

      let sum = 0;
      iceCream.reviews.forEach(review => {
        sum += review.userRating;
      })
      
      iceCream.rating = (sum/iceCream.reviews.length).toFixed(1);
  });

  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("final-project");
    await db.collection("shops").insertMany(shops);
    await db.collection("ice-creams").insertMany(iceCreams);
    client.close();
  } catch (err) {
    console.log(err.message);
  }
};

batchImport();
