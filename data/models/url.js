const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    original_url: String,
    short_url: { type: Number, default: 0 }
});

let url = mongoose.model('Url', urlSchema);

url.pre('save', function(next) {
    var newUrl = this;
    url.find({}, (err, urls) => {
        let numberOfUrls = urls.length;
        newUrl.short_url = numberOfUrls;
        next();
    })

});

