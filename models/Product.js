const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  headline: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  imagePath: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Product', productSchema);
