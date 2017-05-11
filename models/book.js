/*jshint esversion: 6*/

const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const bookSchema = new Schema({
  title: String,
  author: String,
  genre: String,
  pages: Number,
  description: String,
  picture: String,
  available: Boolean,
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  current_user: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
