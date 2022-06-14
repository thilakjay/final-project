const express = require("express");
const app = express();

const { getIceCreams } = require("./handlers/getIceCreams");
const { getIceCream } = require("./handlers/getIceCream");
const { getShops } = require("./handlers/getShops");
const { postReview } = require("./handlers/postReview");

app.use(express.json());
app.get("/api/ice-creams", getIceCreams);
app.get("/api/ice-creams/:id", getIceCream);
app.get("/api/shops", getShops);
app.post("/api/ice-creams/:id", postReview);

app.listen(8000);

