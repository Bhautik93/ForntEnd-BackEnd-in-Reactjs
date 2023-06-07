const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const colors = require("colors");
const router = require("./router/index");
const app = express();

app.use(cors());
app.use(express.static('public'))
app.use(bodyParser.json({limit : "50mb"}));
app.use(bodyParser.urlencoded({limit : "50mb", extended : true, parameterLimit : 50000}))
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(router);

app.listen(8900, () => {
  console.log("8900 is start".green);
});
