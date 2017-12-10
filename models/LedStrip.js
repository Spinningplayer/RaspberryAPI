const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LedStripSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    color: String
});

const Ledstrip = mongoose.model('Ledstrip', LedStripSchema);

module.exports = Ledstrip;