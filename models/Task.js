const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    },
    sleepTime: {
        type: Number,
        required: false
    }
});

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;