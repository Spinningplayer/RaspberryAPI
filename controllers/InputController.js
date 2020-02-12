const Inputs = require('../models/Input');
const InputTypes = require('../models/InputType');

const RoutineController = require('./routineController');

module.exports = {
    
    getInputs(req, res) {
        Inputs.find({})
        .populate('activationRoutine')
        .populate('deactivationRoutine')
        .then(inputs => {
            res.status(200);
            res.json(inputs);
        })
        .catch(err => {
            res.status(500);
            res.json({"msg":"Somethin went wrong"});

            console.log(err);
        });
    },

    getInput(req, res) {
        const id = req.params.id;

        Inputs.findOne({_id:id})
        .populate('activationRoutine')
        .populate('deactivationRoutine')
        .then(input => {
            res.status(200);
            res.json(input);
        })
        .catch(err => {
            res.status(500);
            res.json({"msg":"Somethin went wrong"});

            console.log(err);
        });
    },

    addInput(req, res) {
        const body = req.body;
        let state = false;
        InputTypes.find({})
        .then(types => {
            for( type in types) {
                if(body.type === type.name) {
                    Inputs.create(body)
                    .then(input => {
                        res.status(200);
                        res.json(input);
                        state = true;
                    })
                    .catch(err => {
                        res.status(500);
                        res.json({"msg":"Somethin went wrong"});

                        console.log(err);
                    })
                }
            }
            if(!state) {
                res.status(400);
                res.json({"msg":"Type not accepted"});
            }
        })
        .catch(err => {
            res.status(500);
            res.json({"msg":"Somethin went wrong"});

            console.log(err);
        })
    }
}









