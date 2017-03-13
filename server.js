const express = require('express');
const {mongoose} = require('./db/mongoose');
const {Url} = require('./models/url');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req,res) => {
  res.send('Hello express');
});

app.get('/new/:protocol/*', (req, res) => {
  let protocol = req.params.protocol;
  let address = req.params[0];

  if (protocol !== 'http:' && protocol !== 'https:') {
    return res.status(400).send({
      error: 'Please use a URL in the format: http://www.google.com'
    });
  }

  let randomNum = (Math.floor(Math.random() * (9999-1000) + 1000));
  let short_url = req.hostname + '/' + randomNum;
  let long_url = protocol + '/' + address;

  let url = new Url({
    long_url,
    short_url,
    stub: randomNum
  });

  url.save().then((doc) => {
    res.send(doc);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

app.get('/:stub', (req,res) => {
  let stub = req.params.stub;

  Url.findOne({
    stub
  }).then((url) => {
    if (!url) {
      return res.status(404).send();
    }

    res.redirect(url.long_url);
  }).catch((err) => {
    res.status(400).send(err);
  })
});

app.listen(port, () => {
  console.log(`Server started on ${port}`);
})
