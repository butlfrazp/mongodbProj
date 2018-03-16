const {mongoose} = require('./../DB/mongoose');
const {transaction} = require('./transaction');

const Sell = mongoose.model('sell', transaction);

module.exports = {Sell};
