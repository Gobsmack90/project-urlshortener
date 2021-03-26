const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    original_url: String,
    short_url: { type: Number, default: 0 }
});

//before url.save runs, we look to see how many records we have and save that number as the new short_url.
urlSchema.pre('save', function(next) {
    var newUrl = this;
    Url.find({}, (err, urls) => {
        let numberOfUrls = urls.length;
        newUrl.short_url = numberOfUrls;
        next();
    })
});

//this has to come below urlSchema.pre and needs to be a const so it can be read by urlSchema.pre.
const Url = mongoose.model('Url', urlSchema);

module.exports = Url;