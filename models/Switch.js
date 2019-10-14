const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID = mongoose.Schema.Types.ObjectId;
const Routine = require('./Routine');

const SwitchSchema = new Schema({
   name: {
       type: String,
       required: true
   },
   turnOnRoutine: {
       type: ObjectID,
       ref: 'Routine'
   },
    turnOffRoutine: {
       type: ObjectID,
        ref: 'Routine'
    }
});

const Switch = mongoose.model('Switch', SwitchSchema);

module.exports = Switch;