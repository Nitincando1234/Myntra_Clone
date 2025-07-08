const express = require("express");
const mongoose = require("mongoose");
const Bag = require("../models/Bag");
const Order = require("../models/Order");
const router = express.Router();

function generateRandomTracking() {
  const carriers = ["Delhivery", "Bluedart", "Ecom Express", "XpressBees"];
  const statusOptions = [
    "Shipped",
    "Out for Delivery",
    "Delivered",
    "In Transit",
  ];
  const locations = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Pune"];

  const randomCarrier = carriers[Math.floor(Math.random() * carriers.length)];
  const randomStatusOptions = statusOptions[Math.floor(Math.random() * statusOptions.length)];
  const randomLocation = locations[Math.floor(Math.random() * locations.length)];

  return {
    number: "TRK" + Math.floor(Math.random() * 10000000),
    carrier: randomCarrier, 
    estimatedDelivery: new Date(
        Date.now() + 5 * 24 * 60 * 60 * 1000
    ).toISOString(), 
    currentLocation: randomLocation, 
    status: randomStatusOptions, 
    timeline: [
        {
            status: "Order Placed", 
            location: "Warehouse", 
            timestamp: new Date().toISOString()
        }, 
        {
            status: randomStatusOptions, 
            location: randomLocation, 
            timestamp: new Date().toISOString()
        }
    ]
  };
}

router.post("/create/:userId", async (req, res) => {
    try {
        const userid = req.params.userId;
        const bag = await Bag.find({ userId: userid }).populate("productId");
        if(bag.length === 0) 
            return res.status(200).json({ message: "No item found in Bag"});
            orderitem = bag.map((item) => ({
            productId: item.productId._id, 
            size: item.size, 
            price: item.productId.price, 
            quantity: item.quantity
        }));
        const total = orderitem.reduce(
            (sum, item) => sum + item.price * item.quantity, 0
        );
        console.log(total);
        const newOrder = new Order({
            userId: userid, 
            date: new Date().toISOString(), 
            status: "Delivered", 
            item: orderitem, 
            total: total, 
            shippingAddress: req.body.shippingAddress, 
            paymentMethod: req.body.paymentMethod, 
            tracking: generateRandomTracking()
        });
        await newOrder.save();
        await Bag.deleteMany({ userId: userid }), // delete from bag as the item' s order has been placed
        res.status(200).json({ message: "Order placed successfully"});
    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});

router.get("/user/:userid", async (req, res) => {
    try {
        const order = await Order.find({ userId: req.params.userid })
            .populate("items.productId");
        res.status(200).json(order);
    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});

module.exports = router;