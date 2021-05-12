const express = require("express");
const router = express.Router();
const Roles = require("../models/UserRole");

router.post("/", (req, res) => {
  const newUser = {
    name: req.body.name,
  };
  Roles.create(newUser)
    .then((roleCreated) => {
      res.json(roleCreated);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

router.get("/", (req, res) => {
  Roles.find()
    .then((roles) => {
      res.json(roles);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

module.exports = router;