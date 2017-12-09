const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID = mongoose.Schema.Types.ObjectId;

const ControllerSchema =  new Schema({
    name: {
        type: String,
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

// ControllerSchema.pre('save', function(next){
//     this._id = mongoose.Types.ObjectId;
//})

const Controller = mongoose.model('LedstripController', ControllerSchema);

module.exports = Controller;