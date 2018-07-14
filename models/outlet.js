const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID = mongoose.Schema.Types.ObjectId;
const Routine = require('./Routine');

const OutletSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  state: {
    type: Boolean,
    required: false
  },
  turnOn: {
    type: ObjectID,
    ref: 'Routine'
  },
  turnOff: {
      type: ObjectID,
      ref: 'Routine'
  }
});

const Outlet = mongoose.model('Outlet', OutletSchema);

module.exports = Outlet;