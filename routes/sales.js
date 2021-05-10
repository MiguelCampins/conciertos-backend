const express = require("express");
const router = express.Router();
const Sale = require("../models/Sale");

/**
 * Create sales
 */
router.post("/", (req, res) => {
    const newSale = {
        quantity: req.body.quantity,
        unitPrice: req.body.unitPrice,
        concertId: req.body.concertId,
        userId: req.body.userId,
    };

    Sale.create(newSale)
        .then((saleCreated) => {
            res.json(saleCreated);
        })
        .catch((err) => {
            res.status(500).json({ message: err });
          });
});


module.exports = router;