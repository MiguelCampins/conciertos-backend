const express = require("express");
const router = express.Router();
const Concert = require("../models/Concert");

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

/**
 * Create concert
 */

router.post("/", (req, res) => {
  const newConcert = {
    name: req.body.name,
    date: req.body.date,
    city: req.body.city,
    artists: req.body.artists,
    maxTickets: req.body.maxTickets,
    ticketPrice: req.body.ticketPrice,
    public: req.body.public,
  };

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


module.exports = router;
