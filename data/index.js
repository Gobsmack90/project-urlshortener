const mongodb = require('mongodb');
const mongoose = require('mongoose');
const url = require('./models/url.js');
const urlInt = require('./models/urlInt.js');
process.env.MONGO_URI='mongodb+srv://Gobsmack:asdf1234@cluster0.zb2i8.mongodb.net/<dbname>?retryWrites=true&w=majority';
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const Url = require('./models/url.js');
const UrlInt = require('./models/urlInt.js');

let createAndSaveUrl = (url) => {
    return new Promise((resolve, reject)=>{
        let url = new Url({
            original_url: url,
        });
    
        url.save(function(err, data) {
            if (err) return console.error(err);
            resolve(data);
        });
    })
}

// const createAndSaveUrlInt = (done) => {
//     var intForShortUrl = new urlInt({name: "For Short Url", int: 0});
  
//     intForShortUrl.save(function(err, data) {
//       if (err) return console.error(err);
//       done(null, data)
//     });
// };

let IncrementUrlInt = () => {
    return new Promise((resolve, reject) =>{
        Player.updateOne(
            { name: "For Short Url" }, 
            { int: int + 1},
            (err) => {
                if (err) return reject(err);
                resolve();
            },
        )
    })
};

let checkUrlRecord = (url, int) => {
    return new Promise((resolve, reject) => {
        Url.findOne({ original_url: url }, (err, url) => {
            // If no record of input url, create a new one.
            // //need some sort of interger that gets incremented every time i add a new Url to the database. that new interger is the short_url.
            let shortUrlInt = 0;

            //function that ++ shortUrlInt

            if (!url) return this.createAndSaveUrl(url, int, done);

            return url.save(() => {
                resolve(url);
            });
        });
    });
};

//just grab most recently made short_url and put that + 1 as new short_url.
// let readShortUrl = 

let assignShortUrl = () => {
    return new Promise((resolve, reject) => {
        
        Url.findOne({ short_url: url }, (err, url) => {
            // If no record of input url, create a new one.
            if (!url) return this.createAndSaveUrl(url);

            return url.save(() => {
                resolve(url);
            });
        });
    });
}

let urlRedirect = (shortUrl) => {
    return new Promise((resolve, reject) => {
        Url.findOne({ short_url: shortUrl }, (err, shortUrl) => {
            if (!shortUrl) return false;

            return ShortUrl.save(() => {
                resolve(shortUrl);
            })
        })
    })
}

exports.UrlModel = Url;
exports.UrlIntModel = UrlInt;
exports.createAndSaveUrl = createAndSaveUrl;
exports.createAndSaveUrlInt = createAndSaveUrlInt;
exports.IncrementUrlInt = IncrementUrlInt;
exports.checkUrlRecord = checkUrlRecord;
exports.assignShortUrl = assignShortUrl;
exports.urlRedirect = urlRedirect;
