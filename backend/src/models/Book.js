const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const bookSchema = new mongoose.Schema(
  {
    isFavorite: {
        type: Boolean,
        default: false
    },

    title: {
      type: String,
      required: true
    },
    author: {
      type: String
    },
    description: {
      type: String
    },
    thumbnail: {
      type: String
    },
    notes: [noteSchema]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Book', bookSchema);
