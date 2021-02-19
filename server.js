require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

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
  let original = req.body.url;
  let short = '';

  console.log(original)

  res.json({
    original_url: original,
    short_url: short
  });
})

//get new url
app.get('/api/shorturl/:short_url', (req, res) => {
  
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
