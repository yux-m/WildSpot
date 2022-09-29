const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review')

const ImageSchema = new Schema({
  url: String,
  filename: String
});

ImageSchema.virtual('thumbnail').get(function() {
  return this.url.replace('/upload', '/upload/w_200');
});

const opts = {
  toJSON: {
    virtuals: true
  }
};

const SpotSchema = new Schema({
  title: String,
  images: [ImageSchema],
  geometry: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  location: String,
  species: String,
  description: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: 'Review'
  }]
}, opts);

SpotSchema.virtual('properties.popUpMarkup').get(function() {
  return `
    <strong><a href="/spots/${this._id}">${this.title}</a><strong>
    <p>${this.location}</p>`
});

SpotSchema.post('findOneAndDelete', async function(doc) {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews
      }
    })
  }
})

module.exports = mongoose.model('Spot', SpotSchema);