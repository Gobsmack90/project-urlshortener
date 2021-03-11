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

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

//handle new url input
app.post('/api/shorturl/new', (req, res) => {
  let url = checkUrl(req.body.url);

  res.json({
    original_url: url.original_url,
    short_url: url.short_url
  });
})


//redirect using short url
app.get('/api/shorturl/:short_url', (req, res) => {
  let shortUrl = req.params.short_url;
  let url = urlRedirect(shortUrl);
  if (!url) { return res.json("Not Found") }

  res.redirect(url.original_url)
})

app.get("/api/timestamp/", (req, res) => {
  res.json({ unix: Date.now(), utc: Date() });
});

app.get("/api/timestamp/:date_string", (req, res) => {
  let dateString = req.params.date_string;

  //A 4 digit number is a valid ISO-8601 for the beginning of that year
  //5 digits or more must be a unix time, until we reach a year 10,000 problem
  if (/\d{5,}/.test(dateString)) {
    const dateInt = parseInt(dateString);
    //Date regards numbers as unix timestamps, strings are processed differently
    res.json({ unix: dateInt, utc: new Date(dateInt).toUTCString() });
  } else {
    let dateObject = new Date(dateString);

    if (dateObject.toString() === "Invalid Date") {
      res.json({ error: "Invalid Date" });
    } else {
      res.json({ unix: dateObject.valueOf(), utc: dateObject.toUTCString() });
    }
  }
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
