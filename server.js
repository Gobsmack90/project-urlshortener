require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const mongodb = require('mongodb');
const mongoose = require('mongoose');

process.env.MONGO_URI='mongodb+srv://Gobsmack:asdf1234@cluster0.zb2i8.mongodb.net/<dbname>?retryWrites=true&w=majority';
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

//database functions
const Url = require("./data/index.js").UrlModel;

const createUrl = require("./data/index.js").createAndSaveUrl;
const checkUrl = require("./data/index.js").checkUrlRecord;
const urlRedirect = require("./data/index.js").urlRedirect;
const { createAndSaveUrl } = require('./data/index.js');


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
  // createAndSaveUrlInt(done);
});



//handle new url input
app.post('/api/shorturl/new', (req, res) => {
  // let url = checkUrl(req.body.url, /*int*/);
  //save original url to database and get short_url
  createAndSaveUrl(req.body.url).then((url)=>{
    console.log(url)
  });

  // res.json({
  //   original_url: url.original_url,
  //   short_url: url.short_url
  // });
})

//redirect using short url
app.get('/api/shorturl/:short_url', (req, res) => {
  let shortUrl = req.params.short_url;
  let url = urlRedirect(shortUrl);
  if (!url) { return res.json({"error":"Not Found"}) }

  res.redirect(url.original_url)
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
