const mongoose = require("mongoose");

const SaleSchema = mongoose.Schema({
    quantity: {
        type: Number,
    },
    unitPrice: {
        type: Number,
    },
    concertId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Concert'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model("Sale", SaleSchema);