const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID = mongoose.Schema.Types.ObjectId;
const Task = require('Task')

const RoutineSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    tasks: [{
        type: ObjectID,
        ref: 'Task'
    }],
    state: {
        type: Boolean,
        required: false
    }
});

const Routine = mongoose.model('Routine', RoutineSchema);

module.exports = Routine;
