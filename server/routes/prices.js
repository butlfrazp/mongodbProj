const {app} = require('./../../index.js');

const getDefaultPrice = (req, res, client) => {
  client.getSpotPrice({},function(err, price) {
    if (err) {
      res.status(400).send(err);
      return;
    }
    res.send(price);
  });
}

const getPrice = (req, res, client) => {
  client.getSpotPrice({'currency': req.params.country}, function(err, price) {
    if (err) {
      res.status(400).send(err);
      return;
    }
    res.send(price);
  });
}

module.exports = {
  getDefaultPrice,
  getPrice
};
