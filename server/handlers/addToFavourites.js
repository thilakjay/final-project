const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addToFavourites = async (req, res) => {
    try {
        const client = new MongoClient(MONGO_URI, options);
        await client.connect();
        const db = client.db("final-project");

        //check if ice cream is already in favourites array
        const user = await db.collection("users").findOne({email: req.body.userEmail});
        const favouriteIceCream = user.favourites.find(elem => elem._id === req.body.iceCream._id);
           
        //if found, remove from favourites array
        if(favouriteIceCream) {
            await db.collection("users").updateOne(
                {email: req.body.userEmail},
                {$pull: {favourites: req.body.iceCream}}
            );

            const updatedUser = await db.collection("users").findOne({email: req.body.userEmail});

            res.status(200).json({ 
                status: 200, 
                message: "Removed from Favourites.",
                favourites: updatedUser.favourites
            });
            client.close();
            return;
        }            
        
        //if not favourited, push to favourites array
        await db.collection("users").updateOne(
            {email: req.body.userEmail},
            {
              $push: {
                favourites: req.body.iceCream
              }
            }
        );

        const updatedUser = await db.collection("users").findOne({email: req.body.userEmail});
        
        res.status(200).json({ 
            status: 200, 
            message: "Added to Favourites.",
            favourites: updatedUser.favourites
        });
        client.close();

    } catch (err) {
        res.status(500).json({ status: 500, message: err.message });
    } 
};

module.exports = { addToFavourites };
