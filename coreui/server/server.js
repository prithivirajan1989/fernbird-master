const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const config = require("../server/config/config");
const passport = require("passport");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const userRoutes = require("./routes/user");
const api = require("./routes/api");
const customerRoutes = require("./routes/customer");
const productsRoutes = require("./routes/product");
const supliersRoutes = require("./routes/suplier");
const purchasesRoutes = require("./routes/purchase");
const stocksRoutes = require("./routes/stock");
const app = express();
const db = config.MONGODBURI;


app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

//image upload muiddleware
app.use("/uploads", express.static("uploads"));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

/// routes

app.use("/api", api);
app.use("/user", userRoutes);
app.use("/customers", customerRoutes);
app.use("/products", productsRoutes);
app.use("/supliers", supliersRoutes);
app.use("/purchases", purchasesRoutes);
app.use("/stocks", stocksRoutes);


app.get("/", function (req, res) {
    res.send("helooo from server");
});

app.listen(PORT, function () {
    console.log(" server running on local host" + PORT);
});

mongoose.connect(
    db, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
    },
    (err) => {
        if (err) {
            console.log("Error" + err);
        } else {
            console.log(" connected to mongo db");
        }
    }
);