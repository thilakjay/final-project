const { MongoClient } = require("mongodb");
// const path = require("path");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//posts review of ice cream item
const postReview = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(200).json({
        status: 400,
        message: "Invalid Ice Cream ID",
    });
  }  

  if (!req.body.name) {
    return res.status(200).json({
        status: 400,
        error: "no-name", 
        message: "Cannot publish post - user's name not provided.",
    });
  } 

  if (!req.body.review) {
    return res.status(200).json({
        status: 400,
        error: "no-review",
        message: "Please provide a review before submitting."
    });
  }  
  
  if (!req.body.userRating) {
    return res.status(200).json({
        status: 400,
        error: "no-rating",
        message: "Please provide a rating before submitting."
    });
  }

  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("final-project");

    //add review to reviews array and push it to index 0
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
    
    //retrieve the newly updated document so we can calculate new rating
    const iceCreamResult = await db.collection("ice-creams").findOne({_id: id});
    
    //calculate new average rating of ice cream
    let sum = 0;
    iceCreamResult.reviews.forEach(review => {
      sum += review.userRating;
    })

    const newAvgRating = (sum/iceCreamResult.reviews.length).toFixed(1);
    
    //update the average rating in DB
    await db.collection("ice-creams").updateOne(
      { _id: id },
      { $set: {rating: newAvgRating} }     
    );

    res.status(200).json({ status: 200, message: "OK" });
    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

module.exports = { postReview };
