const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const userrouter = require("./routes/Userroutes");
const categoryrouter = require("./routes/Categoryroutes");
const productrouter = require("./routes/Productroutes");
const bagrouter = require("./routes/Bagroutes");
const wishlistrouter = require("./routes/Wishlistroutes");
const orderrouter = require("./routes/Orderroutes");

const cors = require("cors");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
    origin: "*", 
    credentials: true
}));

app.get("/", (req, res) => {
    res.send("✅Myntra Backend is working");
});

app.use("/user", userrouter);
app.use("/category", categoryrouter);
app.use("/product", productrouter);
app.use("/bag", bagrouter);
app.use("/wishlist", wishlistrouter);
app.use("/order", orderrouter);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true
}).then(() => { console.log("Mongo DB is connected !"); })
.catch((err) => { console.log(err); })

const PORT = process.env.PORT;
app.listen(PORT, (() => { console.log(`App is listening on PORT: ${PORT}`); }));