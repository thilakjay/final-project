const express = require('express');
const app = express();

const {getAllInfo} = require("./handlers/getAllInfo");

app.get("/api/all", getAllInfo);
// app.get("api/ice-creams, getIceCreams");
// app.get("/api/shops", getShops)
// app.get("/api/shops/:shopId", getShop)
// app.get("/api/user/login", login)
// app.get("/api/user/register", register)

app.listen(8000);


// "use strict";

// const express = require("express");
// const morgan = require("morgan");

// // importing handlers
// const { getAllItems } = require("./handlers/getAllItems");

// const PORT = 8000;

// this is my express server :)

// express()
//   .use(function (req, res, next) {
//     res.header(
//       "Access-Control-Allow-Methods",
//       "OPTIONS, HEAD, GET, PUT, POST, DELETE"
//     );
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next();
//   })
//   .use(morgan("tiny"))
//   .use(express.static("./server/assets"))
//   .use(express.json())
//   .use(express.urlencoded({ extended: false }))
//   .use("/", express.static(__dirname + "/"))


//   // ITEMS: display all and by id //
//   //Get all items and all item's information
//   .get("/api/items", getAllItems)


//   .listen(PORT, () => console.info(`Listening on port ${PORT}`));
