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

/**
 * mostrar ventas de cada usuario
 */
 router.post("/filter", (req,res) => {
  const {userId} = req.body;

  const params = {};
  if(userId){
    params.userId = userId;
  }
    Sale.find(params)
    .then((filteredSale) => {
      res.json(filteredSale)
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
    })

module.exports = router;