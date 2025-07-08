const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema(
    {
        name: String, brand: String, price: String, 
        discount: String, 
        description: String, 
        size: [String], images: [String]
    }, 
    { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);