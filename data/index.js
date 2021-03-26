const Url = require('./models/url.js');

let createAndSaveUrl = (original_url) => {
    return new Promise((resolve, reject)=>{
        let url = new Url({
            original_url: original_url,
        });
    
        url.save(function(err, data) {
            if (err) return console.error(err);
            resolve(data);
        });
    })
}

let checkUrlRecord = (original_url) => {
    return new Promise((resolve, reject) => {
        Url.findOne({ original_url: original_url }, (err, urlObject) => {
            // If no record of input url, create a new one.
            if (!urlObject) return createAndSaveUrl(original_url).then((data) => {
                resolve(data)
            });

            resolve(urlObject);
        });
    });
}; 

let readShortUrl = (short_url) => {
    return new Promise((resolve, reject) => {
        Url.findOne({ short_url: short_url }, (err, urlObject) => {
            // If no record of input url, return null.
            if (!urlObject) {
                resolve(null);
                return;
            }

            resolve(urlObject.original_url);
        });
    });
}; 

exports.checkUrlRecord = checkUrlRecord;
exports.readShortUrl = readShortUrl;
