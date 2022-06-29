const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const path = require("path");

const { getIceCreams } = require("./handlers/getIceCreams");
const { getIceCream } = require("./handlers/getIceCream");
const { getShops } = require("./handlers/getShops");
const { postReview } = require("./handlers/postReview");
const {verifyUser} = require("./handlers/verifyUser");
const {addToFavourites} = require("./handlers/addToFavourites");
const {getFavourite} = require("./handlers/getFavourite");
const {getFavourites} = require("./handlers/getFavourites");
const {removeFavourite} = require("./handlers/removeFavourite");

app.use(express.json());
app.get("/api/ice-creams", getIceCreams);
app.get("/api/ice-creams/:id", getIceCream);
app.get("/api/shops", getShops);
app.post("/api/ice-creams/:id", postReview);
app.post("/api/verify-user", verifyUser);
app.post("/api/add-ice-cream", addToFavourites);
app.post("/api/get-favourite", getFavourite);
app.post("/api/get-favourites", getFavourites);
app.post("/api/remove-favourite", removeFavourite);


// for deployment

__dirname = path.resolve();

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build'))); //app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(PORT, console.log(`Server is starting at ${PORT}`));

