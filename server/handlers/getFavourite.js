const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getFavourite = async (req, res) => {
    try {
        const client = new MongoClient(MONGO_URI, options);
        await client.connect();
        const db = client.db("final-project");

        //check if ice cream is in favourites array
        const user = await db.collection("users").findOne({email: req.body.userEmail});
        const favouriteIceCream = user.favourites.find(elem => elem._id === req.body.iceCream._id);
           
        //if found, return true (found) response.
        if(favouriteIceCream) {
            res.status(200).json({ 
                status: 200, 
                message: "Not in favourites",
                isFavourite: true
            });
            client.close();
            return;
        }            
        
        //if not favourited, return false (not found) response.
        res.status(200).json({ 
            status: 200, 
            message: "Not in favourites",
            isFavourite: false
        });
        client.close();

    } catch (err) {
        res.status(500).json({ status: 500, message: err.message });
    } 
};

module.exports = { getFavourite };
