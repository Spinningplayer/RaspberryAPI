const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID = mongose.Schema.Types.ObjectId;
const Routine = require('./Routine');

const SwitchSchema = new Schema({
  name: {
    type: string,
    required: true
  },
  state: {
    type: Boolean,
    required: false
  },
  onRoutine: {
    type: ObjectID,
    ref: 'Routine'
  },
  offRoutine: {
    type: ObjectID,
    ref: 'Routine'
  }
});

const Switch = mongoose.model('Switch', SwitchSchema);

module.exports = Switch;