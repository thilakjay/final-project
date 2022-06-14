const { MongoClient } = require("mongodb");
// const path = require("path");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};


//retrieves info on specific ice cream item
const getIceCream = async (req, res) => {
    const {id} = req.params;

    if (!id) {
        return res.status(400).json({
            status: 400,
            message: "Invalid Ice Cream ID",
        });
    }  

    try {
        const client = new MongoClient(MONGO_URI, options);
        await client.connect();
        const db = client.db("final-project");
        
        //gets ice cream item
        const iceCreamResult = await db.collection("ice-creams").findOne({_id: id});

        //get shop ID associated to ice cream item
        const shopIdQuery = {_id: iceCreamResult.shopId}; 
        const shopResult = await db.collection("shops").findOne(shopIdQuery)

        const result = {
            iceCream: iceCreamResult,
            shop: shopResult
        };

        res.status(200).json({
        status: 200,
        data: result,
        });
        client.close();
    } catch (err) {
        res.status(500).json({ status: 500, message: err.message });
    } 
};

module.exports = { getIceCream };
