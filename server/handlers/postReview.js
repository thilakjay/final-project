const { MongoClient } = require("mongodb");
// const path = require("path");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const postReview = async (req, res) => {
  const { id } = req.params;

  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("final-project");
    await db.collection("ice-creams").updateOne(
      { _id: id },
      {
        $push: {
          reviews: {
            $each: [req.body],
            $position: 0,
          },
        },
      }
    );
    res.status(200).json({ status: 200, message: "OK" });
    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

module.exports = { postReview };
