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
  published: {
    type: Boolean,
    default: false,
  },
  imageUrl: {
    type: String,
    default: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  },
  images:[{ type: String }],
});

module.exports = mongoose.model("Concert", ConcertSchema);
