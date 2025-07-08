const express = require("express");
const Bag = require("../models/Wishlist");
const Wishlist = require("../models/Wishlist");
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const Wishlists = new Wishlist(req.body);
        const saveitem = await Wishlists.save();
        res.status(200).json(saveitem);
    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong!" } );
    }
});

router.get("/:userid", async (req, res) => {
    try {
        const bag = await Wishlist.find({ userId: req.params.userid }).populate("productId");
        res.status(200).json(bag)
    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong !"});
    }
});

router.delete("/:itemid", async (req, res) => {
    try {
        await Wishlist.findByIdAndDelete(req.params.itemid);
        res.status(200).json({ message: "Item removed from bag "});
    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: "Error occured during removing item from bag" });
    }
});

module.exports = router;