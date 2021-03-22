const mongoose = require('mongoose');

const urlIntSchema = new mongoose.Schema({
    name: String,
    int: Number
});

module.exports = mongoose.model('Int', urlIntSchema)
