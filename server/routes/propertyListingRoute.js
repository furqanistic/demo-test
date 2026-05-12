const express = require('express');
const {
  getPropertyListings,
  getPropertyListingById,
  createPropertyListing,
} = require('../controllers/propertyListingController');

const router = express.Router();

router.route('/property-listings').get(getPropertyListings).post(createPropertyListing);

router.route('/property-listings/:id').get(getPropertyListingById);

module.exports = router;
