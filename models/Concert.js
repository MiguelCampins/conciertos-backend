const mongoose = require("mongoose");

const ConcertSchema = mongoose.Schema({
  name: {
    type: String,
  },
  date: {
    type: Date,
  },
  city: {
    type: String,
  },
  artists: [{ type: String }],
  maxTickets: {
    type: Number,
  },
  ticketPrice: {
    type: Number,
  },
  public: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Concert", ConcertSchema);
