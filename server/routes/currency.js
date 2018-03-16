const {app} = require('./../../index.js');

const getAllCurrencies = (req, res, client) => {
  client.getCurrencies(function(err, currencies) {
    if (err) {
      res.status(400).send(err);
      return;
    }
    res.send(currencies);
  });
}

const getCurrency = (req, res, client) => {
  const param = req.params.country;
  client.getCurrencies(function(err, currencies) {
    if (err) {
      res.status(400).send(err);
      return;
    }
    for (var i = 0; i < currencies.data.length; i++) {
      if (currencies.data[i].id == param) {
        res.send(currencies.data[i]);
        return;
      }
    }
    res.status(400).send("Sorry could not find the currency");
  });
}

module.exports = {
  allCurrencies: getAllCurrencies,
  currency: getCurrency
};
