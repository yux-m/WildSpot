const mongoose = require('mongoose');
const cities = require('./cities');
const {
  animals,
  descriptors,
  closing
} = require('./seedHelpers');
const Spot = require('../models/spot');

mongoose.connect('mongodb://localhost:27017/wild-spot');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected")
})

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Spot.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const sp = new Spot({
      author: '632e2ea4708527a65c0a58da',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(animals)} ${sample(closing)}`,
      species: `${sample(animals)}`,
      //image: 'https://source.unsplash.com/1600x900/?wildlife',
      geometry: {
        type: 'Point',
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude
        ]
      },
      images: [{
          url: 'https://res.cloudinary.com/dvidz8bwi/image/upload/v1664290230/WildSpot/wvbsxwgmedobdcdwiujj.jpg',
          filename: 'WildSpot/wvbsxwgmedobdcdwiujj'
        },
        {
          url: 'https://res.cloudinary.com/dvidz8bwi/image/upload/v1664290414/WildSpot/afbez2hl4x5dcp6qb4te.jpg',
          filename: 'WildSpot/afbez2hl4x5dcp6qb4te'
        }
      ],
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi gravida mi eros, et porttitor lorem efficitur et. Nunc tincidunt leo eu lorem cursus, at ornare mi congue.'
    })
    await sp.save();
  }
}

seedDB()