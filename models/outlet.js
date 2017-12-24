const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OutletSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  number: {
    type: Number,
    required: true
  },
  state: {
    type: Boolean,
    required: false
  }
});

const Outlet = mongoose.model('Outlet', OutletSchema);

module.exports = Outlet;