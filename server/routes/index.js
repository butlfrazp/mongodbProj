const {buy} = require('./buy');
const {sell} = require('./sell');
const {allCurrencies, currency} = require('./currency');
const {
  getDefaultPrice,
  getPrice
} = require('./prices');

module.exports = {
  buy,
  sell,
  allCurrencies,
  currency,
  getDefaultPrice,
  getPrice
};
