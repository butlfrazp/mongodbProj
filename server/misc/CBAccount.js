const account = (client, callback) => {
  client.getAccounts({}, function(err, accounts) {
    callback(accounts);
  });
}

module.exports = {account};
