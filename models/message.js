/*jshint esversion: 6*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({

  body: {
    type: String,
    required: true
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  senderName: String,
  bookId:  {
    type: Schema.Types.ObjectId,
    ref: 'Book'}
  }, {
   timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
 });

module.exports = mongoose.model('Message', MessageSchema);
