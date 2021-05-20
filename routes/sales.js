const express = require("express");
const router = express.Router();
const Sale = require("../models/Sale");

/**
 * Create sales
 */
router.post("/", (req, res) => {
    const newSale = {...req.body.sale};
    Sale.create(newSale)
        .then((saleCreated) => {
            res.json(saleCreated);
        })
        .catch((err) => {
            res.status(500).json({ message: err });
          });
});

/**
 * mostras ventas
 */

router.get("/", (req,res) => {
    Sale.find()
    .then((sales) => {
      res.json(sales);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

module.exports = router;