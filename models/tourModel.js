const mongoose = require("mongoose");

const tourSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rating: Number,
});

const TourModel = mongoose.model("Tour", tourSchema);

module.exports = TourModel;
