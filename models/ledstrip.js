const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LedstripSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    Address: {
        type: Number,
        required: true
    },
    mode: {
        type: Number,
        required: false
    },
    color: [{
        type: number,
        required: false
    }]
});

const Ledstrip = mongoose.model('Ledstrip', LedstripSchema);

module.exports = Ledstrip;