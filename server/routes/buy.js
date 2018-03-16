const {app} = require('./../../index.js');
const {Buy} = require('./../models');

const buy = (req, res, client) => {
  const date = Date.now();
  const {symbol, quantity} = req.body;
  client.getBuyPrice({'currencyPair': symbol}, function(err, price) {
    if (err) {
      res.status(400).send(err);
      return;
    }
    const buy = new Buy({
      symbol: req.body.symbol,
      quantity: req.body.quantity,
      price: parseInt(price.data.amount),
      date
    });
    buy.save()
      .then((doc) => {
        res.send(doc);
      })
      .catch(error => {
        res.status(400).send(error);
      })
  });
}

module.exports = {buy};
