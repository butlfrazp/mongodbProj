const {mongoose} = require('./../DB/mongoose');
var Schema = mongoose.Schema;

const transaction = new Schema({
  symbol: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  quantity: {
    type: Number,
    default: 1
  },
  date: {
    type: Date,
    requred: true
  },
  price: {
    type: Number,
    required: true
  }
});

module.exports = {transaction};
