const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID = mongoose.Schema.Types.ObjectId;

const ControllerSchema =  new Schema({
    _id: ObjectID,
    name: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    ledstrips: [{
        _id: ObjectID,
        name: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        color: [Number]
    }]
});

const Controller = mongoose.model('LedstripController', ControllerSchema);

module.exports = Controller;