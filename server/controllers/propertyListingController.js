const PropertyListing = require('../models/propertyListingModel');
const asyncErrorHandler = require('../middlewares/helpers/asyncErrorHandler');
const ErrorHandler = require('../utils/errorHandler');

exports.getPropertyListings = asyncErrorHandler(async (req, res) => {
  const listings = await PropertyListing.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, listings });
});

exports.getPropertyListingById = asyncErrorHandler(async (req, res, next) => {
  const listing = await PropertyListing.findById(req.params.id);
  if (!listing) {
    return next(new ErrorHandler('Listing not found', 404));
  }
  res.status(200).json({ success: true, listing });
});

exports.createPropertyListing = asyncErrorHandler(async (req, res) => {
  const { title, location, price, roi, image, description, model3d, features, modelUrl } = req.body;

  const listing = await PropertyListing.create({
    title,
    location,
    price: Number(price),
    roi: Number(roi),
    image,
    description: description || '',
    model3d: Boolean(model3d),
    modelUrl: typeof modelUrl === 'string' ? modelUrl.trim() : '',
    features: Array.isArray(features) ? features : typeof features === 'string' && features ? features.split(',').map((s) => s.trim()).filter(Boolean) : [],
  });

  res.status(201).json({ success: true, listing });
});
