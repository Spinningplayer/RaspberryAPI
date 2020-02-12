const mongoose = require('mongose');
const Schema = mongoose.Schema;

const InputTypSchema = new Schema({
    name: {
        type: String,
        required: true
    }
})

const InputType = mongoose.model('InputType', InputTypSchema);

module.exports = InputType;