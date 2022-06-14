const { MongoClient } = require("mongodb");
// const path = require("path");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//gets all shop info
const getShops = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("final-project");
    const result = await db.collection("shops").find().toArray();

    res.status(200).json({
      status: 200,
      data: result,
    });

    client.close();
    
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

module.exports = { getShops };
