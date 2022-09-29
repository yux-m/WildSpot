const express = require('express');
const router = express.Router({
  mergeParams: true
});
const {
  isLoggedIn,
  isReviewAuthor,
  validateReview,
} = require('../middleware');
const reviews = require('../controllers/reviews')
const catchAsync = require('../utils/catchAsync');
const {
  reviewSchema
} = require('../schemas.js')
const ExpressError = require('../utils/ExpressError');
const Spot = require('../models/spot');
const Review = require('../models/review');



router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;