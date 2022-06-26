const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getFavourites = async (req, res) => {
    try {
        const client = new MongoClient(MONGO_URI, options);
        await client.connect();
        const db = client.db("final-project");

        const user = await db.collection("users").findOne({email: req.body.userEmail});
        const favouriteIceCreams = user.favourites;
           
        res.status(200).json({ 
            status: 200, 
            favourites: favouriteIceCreams
        });
        client.close();

    } catch (err) {
        res.status(500).json({ status: 500, message: err.message });
    } 
};

module.exports = { getFavourites };
