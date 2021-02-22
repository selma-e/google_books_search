const fetch = require("node-fetch");

// Defining methods for the googleController
module.exports = {
  findAll: function (req, res) {
    fetch(
      "https://www.googleapis.com/books/v1/volumes?q=intitle:" + req.query.title
    )
      .then((res) => res.json())
      .then((books) => res.json(books))
      .catch((err) => res.status(422).json(err));
  },
};
