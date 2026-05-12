const mongoose = require('mongoose');

const propertyListingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    location: { type: String, required: true, trim: true, maxlength: 200 },
    price: { type: Number, required: true, min: 0 },
    roi: { type: Number, required: true, min: 0 },
    image: { type: String, required: true, trim: true },
    description: { type: String, default: '', maxlength: 4000 },
    model3d: { type: Boolean, default: false },
    modelUrl: { type: String, default: '', trim: true },
    features: [{ type: String, trim: true }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('PropertyListing', propertyListingSchema);
