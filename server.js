if (process.env.NODE_ENV !== "production") require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

const sheetsRoute = require("./routes/sheets.route");
const razorpayRoute = require("./routes/razorpay.route");
const {options} = require("./routes/sheets.route");

const app = express();

app.use(cors());

app.use(express.json());
app.use(bodyParser.json());

app.use("/api", sheetsRoute);
app.use("/", razorpayRoute);

app.listen(process.env.PORT, () =>
    console.log(`SERVER IS RUNNING ON PORT ${process.env.PORT}`)
);
