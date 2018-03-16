const {mongoose} = require('./../DB/mongoose');
const {transaction} = require('./transaction');

const Buy = mongoose.model('buy', transaction);

module.exports = {Buy};
