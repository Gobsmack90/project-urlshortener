require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const mongodb = require('mongodb');
const mongoose = require('mongoose');

process.env.MONGO_URI='mongodb+srv://Gobsmack:asdf1234@cluster0.zb2i8.mongodb.net/<dbname>?retryWrites=true&w=majority';
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

//database functions
const checkUrlRecord = require("./data/index.js").checkUrlRecord;
const readShortUrl = require("./data/index.js").readShortUrl;

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

//requred to use req.body from the html form
app.use(express.urlencoded({
  extended: true
}));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// handle new url input
app.post('/api/shorturl/new', (req, res) => {
  let url = req.body.url;

  var validUrl = /^(ftp|http|https):\/\/[^ "]+$/;
  
  if (validUrl.test(url)) {
    checkUrlRecord(url).then((data) => {
      res.json({
        original_url: data.original_url,
        short_url: data.short_url
      });
    })
  } else {
    res.json({error: "Invalid URL"
    })
  }
});

//redirect using short url
app.get('/api/shorturl/:short_url', (req, res) => {
  let shortUrl = req.params.short_url;
  
  readShortUrl(shortUrl).then((data) => {
    if (data === null) {
      res.json({error: "No short URL found for the given input."});
    } else {res.redirect(data)}
  })
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
