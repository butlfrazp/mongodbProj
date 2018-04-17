//calling outside dependencies
const express = require('express');
const request = require('request');
const Client = require('coinbase').Client;
const bodyParser = require('body-parser');
const path = require('path');

//local dependencies
const COINBASE = require('./configs/coinbase');
const CB_PARAMS = require('./configs/coinbaseParams.js');

//mongoose models
const {Buy} = require('./server/models/buy');
const {Sell} = require('./server/models/sell');
const {account} = require('./server/misc/CBAccount');

const {
  buy,
  sell,
  allCurrencies,
  currency,
  getDefaultPrice,
  getPrice
} = require('./server/routes');

//initializing server
const app = express();
app.use(bodyParser.json());

//creating path for public folder
const publicPath = path.join(__dirname, "./public");
app.use(express.static(publicPath));

const PORT = process.env.PORT || 3000;;

const {
  CURRENCY_CODE
} = CB_PARAMS;

const {
  API_KEY,
  API_SECRET,
  VERSION
} = COINBASE;

const client = new Client({
  'apiKey': API_KEY,
  'apiSecret': API_SECRET,
  'version': VERSION
});;

app.listen(PORT, () => {
  console.log(`Started up on Port ${PORT}`);
});

app.get("/myaccount", (req, res) => {
  account(client, accounts => {
    res.send(accounts);
  });
});

app.get("/myaccount/balance", (req, res) => {
  account(client, accounts => {
    var balance = [];
    accounts.map(amount => {
      const data = {
        amount: amount.balance.amount,
        currency: amount.balance.currency
      };
      balance.push(data);
    });
    res.send(balance);
  });
});

app.post("/sell", (req, res) => {
  sell(req, res, client);
});

app.post("/buy", (req, res) => {
  buy(req, res, client);
});

app.get("/portfolio", (req, res) => {
  var data = {};
  const params = "price quantity symbol"
  Sell.find({}, params, (err, sell) => {
    if (err) {
      res.status(400).send(err);
      return;
    }
    data.sell = sell;
    Buy.find({}, params, (err, buy) => {
      if (err) {
        res.status(400).send(err);
        return;
      }
      data.buy = buy;
      res.send(data);
    })
  })
});

app.get("/past_transactions", (req, res) => {
  var data = {};
  Sell.find({}, (error, sell) => {
    if (error) {
      res.staus(400).send(error);
    }
    data["sell"] = sell;
    Buy.find({}, (error, buy) => {
      if (error) {
        res.staus(400).send(error);
      }
      data["buy"] = buy;
      res.send(data);
    })
  })
})

app.get("/currency", (req, res) => {
  allCurrencies(req, res, client);
});

app.get("/currency/:country", (req, res) => {
  currency(req, res, client);
});

app.get("/prices", (req, res) => {
  getDefaultPrice(req, res, client);
});

app.get("/prices/:country", (req, res) => {
  getPrice(req, res, client);
});

app.get("/holdings", (req, res) => {
  var data = {};
  Buy.find({}, (error, buy) => {
    if (error) {
      res.staus(400).send(error);
    }
    buy.map(elem => {
      if (!data[elem.symbol]) {
        data[elem.symbol] = elem.quantity
      }else{
        data[elem.symbol] += elem.quantity;
      }
    });
    Sell.find({}, (error, sell) => {
      if (error) {
        res.staus(400).send(error);
      }
      sell.map(elem => {
        data[elem.symbol] -= elem.quantity;
      });
      res.send(data);
    });
  });
});

app.get("/")

module.exports = {
  app
};
