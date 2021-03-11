const mongodb = require('mongodb');
const mongoose = require('mongoose');
process.env.MONGO_URI='mongodb+srv://Gobsmack:asdf1234@cluster0.zb2i8.mongodb.net/<dbname>?retryWrites=true&w=majority';
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const Url = require('./models/url');

module.exports = Base => class extends Base {

    createAndSaveUrl = (url) => {
        let url = new Url({
            original_url: url,
            short_url: '',
        });

        url.save(function(err, data) {
            if (err) return console.error(err);
            done(null, data)
          });
    }

    checkUrlRecord(url) {
        return new Promise((resolve, reject) => {
            Url.findOne({ original_url: url }, (err, url) => {
                // If no record of input url, create a new one.
                if (!url) return this.createAndSaveUrl(url);

                return url.save(() => {
                    resolve(url);
                });
            });
        });
    };

};