const express = require("express");
const router = express.Router();
const Concert = require("../models/Concert");
const Sale = require('../models/Sale');

/**
 * Show concerts
 */
router.get("/", (req, res) => {
  Concert.find()
    .then((concerts) => {
      res.json(concerts);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
})

router.get("/filter", (req, res) => {
  const params = {};
  if(req.query.published){
    params.published = req.query.published === 'true';
  }
    Concert.find(params)
    .then((concerts) => {
      res.json(concerts);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
})

/**
 * Show concert by Id
 */

 router.get("/:concertId", (req, res) => {
  const _id = req.params.concertId; 
  Concert.findById(_id, { useFindAndModify: false })
    .then((concert) => {
      res.json(concert);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

/**
 * Get the remaining tickets
 */

 router.get("/remainingTickets/:concertId", (req, res) => {
  const _id = req.params.concertId; 
  Concert.findById(_id, { useFindAndModify: false })
    .then((concert) => {
      // encuentro las ventas de ese concierto
      Sale.find({ concertId: _id })
        .then((foundSales) => {
          let ticketsRemaining = concert?.maxTickets;
          // por cada venta, le resto la cantidad vendidas de esa venta al máximo de tickets
          foundSales.forEach((sale) => {
            ticketsRemaining = ticketsRemaining - sale.quantity;
          });
          res.json(ticketsRemaining);
        })
        .catch((err) => {
          res.status(500).json({ message: err });
        });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});


/**
 * Create concert
 */

router.post("/", (req, res) => {
  const newConcert = {...req.body.concert};
  Concert.create(newConcert)
    .then((concertCreated) => {
      res.json(concertCreated);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

/**
 * Update concert 
 */
router.put("/:concertId", (req, res) => {
  const _id = req.params.concertId;
  const concert = req.body;
  Concert.findByIdAndUpdate(_id, concert, { new: true, useFindAndModify: false})
    .then((updateConcert) => {
      res.json(updateConcert);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

/**
 *Delete concert 
 */

router.delete("/:concertId", (req, res) => {
  const _id = req.params.concertId;
  Concert.findByIdAndRemove(_id, { useFindAndModify: false })
    .then((concert) => {
      res.json(concert);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
})

module.exports = router;
