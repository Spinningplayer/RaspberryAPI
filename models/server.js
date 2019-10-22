const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    ram: {
        type: Number,
        required: true
    }
});

const Server = mongoose.model('Server', ServerSchema);

module.exports = Server;
