const mongoose = require('mongoose');
const Schema = mongoose.Schema();
const Ledstrip = require('./ledstrip')

const ControllerSchema =  mew Schema({
    name: {
        type: number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    ledstrips: [Ledstrip]
});

const Controller = mongoose.model('LedstripController', ControllerSchema);

module.exports = Controller;