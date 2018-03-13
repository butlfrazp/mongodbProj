const express = require('express');
const request = require('request');
const app = express();

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Started up on Port ${PORT}`);
});

app.get("/", (req, res) => {
  request("https://jsonplaceholder.typicode.com/posts/1", (error, response, body) => {
    if (error) {
      res.status(400).send(error)
      return;
    }
    res.send(body);
  });
});

app.get("/:symbol", (req, res) => {
  const SYMBOL = req.params.symbol;
  const URL = "https://api.coinmarketcap.com/v1/ticker/" + SYMBOL;
  setInterval(() => {
    request(URL, (error, response, body) => {
      if (error) {
        res.status(400).send(error);
        return;
      }
      res.send(body);
    });
  }, 5000);
});
