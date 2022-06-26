const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const verifyUser = async (req, res) => {

    try {
        const client = new MongoClient(MONGO_URI, options);
        await client.connect();
        const db = client.db("final-project");

        //check if user exists in DB
        const userResult = await db.collection("users").findOne({"email": req.body.email});

        //if user doesn't exist in DB, add him to 'users' collection
        if(!userResult) {
            console.log("user doesn't exist");
            await db.collection("users").insertOne(req.body);

            res.status(200).json({
                status: 200,
                data: req.body,
            });

            client.close();

            return;
        }

        //if user exists in DB, return existing user info
        res.status(200).json({
            status: 200,
            data: userResult,
        });

        client.close();

    } catch (err) {
        res.status(500).json({ status: 500, message: err.message });
    } 
};

module.exports = { verifyUser };
