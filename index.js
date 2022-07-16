require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
const productRoute = require("./src/routers/product.route")
const app = express();

app.use(cors())
app.use(helmet({
  crossOriginResourcePolicy : false
}))
app.use(xss())
app.use(bodyParser.json())

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello World"
  })
})

app.use(productRoute)

app.use(express.static("public"))

const APP_PORT = process.env.PORT || 4000

app.listen(APP_PORT, () => {
  console.log(`Service running on port ${APP_PORT}`)
})