const mongoose = require("mongoose");

const ConcertSchema = mongoose.Schema({
  name: {
    type: String,
  },
  date: {
    type: String,
  },
  hour: {
    type: String,
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
  imageUrl: {
    type: String,
  }
});

module.exports = mongoose.model("Concert", ConcertSchema);
