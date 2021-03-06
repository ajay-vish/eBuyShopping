const mongoose = require("mongoose");
const express = require("express");
require("dotenv").config();
const app = express();
const bodyParser = require("body-parser");
const cookieparser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");

const stripeRoutes = require("./routes/stripepayment");
const config = require("./config/database");

//db connection
mongoose
	.connect(config.database, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => {
		console.log("Db CONNECTED");
	});

//this is middleware
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cookieparser());
app.use(cors({ "Access-Control-Allow-Origin": "*" }));

//Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", stripeRoutes);

//PORT
const port = process.env.PORT || 8000;

app.listen(port, () => {
	console.log(`running on port ${port}`);
});
