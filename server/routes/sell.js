const {app} = require('./../../index.js');
const {Sell, Buy} = require('./../models');

const sell = (req, res, client) => {
  const {symbol, quantity} = req.body;
  Buy.find({"symbol" : symbol}, "quantity", (error, buy) => {
    if (error) {
      res.status(400).send(error);
      return;
    }
    var buyTotal = 0;
    buy.map(obj => {
      buyTotal += obj.quantity;
    });
    Sell.find({"symbol" : symbol}, "quantity", (err, sell) => {
      if (err) {
        res.status(400).send(err);
        return;
      }
      var sellTotal = 0;
      sell.map(obj => {
        sellTotal += parseInt(obj.quantity);
      });

      const SELL_MAX = buyTotal - sellTotal;
      if (SELL_MAX == 0) {
        res.status(400).send({message: `Sorry you cannot sell more ${symbol} than you have`});
        return;
      }
      
      var quant = SELL_MAX < req.body.quantity ? SELL_MAX : quantity;

      const date = Date.now();
      client.getBuyPrice({'currencyPair': symbol}, function(err, price) {
        if (err) {
          res.status(400).send(err);
          return;
        }
        const sell = new Sell({
          symbol: symbol,
          quantity: quant,
          price: parseInt(price.data.amount),
          date: date
        });
        sell.save()
          .then((doc) => {
            res.send(doc);
          })
          .catch(error => {
            res.status(400).send(error);
          })
      });
    });
  });
}

module.exports = {sell};
