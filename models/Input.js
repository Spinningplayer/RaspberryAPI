const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID = mongoose.Schema.Types.ObjectId;
const Routine = require('./Routine')

const InputSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true   
    },
    valueBoolean: {
        type: Boolean,
        required: false
    },
    valueInteger: {
        type: Number,
        required: false
    },
    activationRoutine: {
        type: ObjectID,
        ref: 'Routine',
        required: false
    },
    deactivationRoutine: {
        type: ObjectID,
        ref: 'Routine',
        required: false
    }
})