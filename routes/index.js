var express = require("express");
var router = express.Router();
var fetch = require("sync-fetch");

require("dotenv").config({ path: __dirname + "/../.env" });

const HASURA_GRAPHQL_ADMIN_SECRET = process.env.HASURA_GRAPHQL_ADMIN_SECRET;

let url = `${process.env.HASURA_GRAPHQL_URL}?_=${new Date().getTime()}`;
url = `${process.env.HASURA_GRAPHQL_URL}`;

console.log(url);

let settings = {
  method: "Get",
  headers: {
    "Content-Type": "application/json",
    "X-Hasura-Admin-Secret": HASURA_GRAPHQL_ADMIN_SECRET,
  },
};

// let driveSpaceData = "";

// fetch(url, settings)
//   .then((res) => res.json())
//   .then((json) => {
//     // do something with JSON
//     driveSpaceData = json.server_space_latest_data;
//   });

const driveSpaceData = fetch(url, settings).json().server_space_latest_data;

/* GET home page. */
router.get("/", function (req, res, next) {
  res.set("Cache-Control", "no-cache");
  res.set("Pragma", "no-cache");
  res.render("index", { title: "Drive Space", driveSpaceData });
});

module.exports = router;
