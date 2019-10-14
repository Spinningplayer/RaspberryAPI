const Switches = require('../models/Switch');

module.exports = {
    getSwitches(req, res) {
        Switches.find({}).populate('turnOnRoutine', 'turnOffRoutine')
            .then(switches => {
                res.status(200).json(switches)
            }).catch(err => {
                res.status(500).json({"msg":"Something went wrong server side."});
        })
    },

    getSwitch(req, res) {
        const id = req.params.id;
        Switches.find({_id: id}).populate('turnOnRoutine', 'turnOffRoutine')
            .then(sObject => {
                res.status(200).json(sObject);
        }).catch(err => {
            res.status(500).json({"msg":"Something went wrong server side."});
        })
    },

    createSwitch(req, res) {
        const body = req.body;

        Switches.create(body)
            .then(sObject => {
                res.status(200).json(sObject);
            }).catch(err => {
                res.status(500).json({"msg":"Something went wrong server side."});
        })
    },

    updateSwitch(req, res) {
        const body = req.body;
        const id = req.params.id;

        Switches.findOneAndUpdate({_id: id}, body).populate('turnOnRoutine', 'turnOffRoutine')
            .then(sObject => {
                res.status(200).json(body);
            }).catch(err => {
                res.status(500).json({"msg":"Something went wrong server side."});
        })
    },

    deleteSwitch(req, res) {
        const id = req.params.id;

        Switches.findOneAndRemove({_id: id})
            .then(sObject => {
                res.status(200).json({"msg":"Succesfuly deleted switch."})
            }).catch(err => {
                res.status(500).json({"msg":"Something went wrong server side."});
        })
    },

    updateOnRoutine(req, res) {
        const id = req.params.id;
        const mode = req.params.mode;
        const body = req.body;

        Switches.find({_id:id}).populate('turnOnRoutine', 'turnOffRoutine')
            .then(sObject => {
                sObject.turnOnRoutine = body._id;
                Switches.findOneAndUpdate({_id:id},
                    {
                        turnOnRoutine:sObject.turnOnRoutine
                    }).populate('turnOnRoutine', 'turnOffRoutine')
                    .then(sObject2 => {
                        Switches.findOne({_id:id}).populate('turnOnRoutine')
                            .then(sObject3 => {
                               res.status(200).json(sObject3);
                            });
                    }).catch(err => {
                        console.log(err);
                        res.status(500).json({"msg":"Something went wrong server side."});
                });

            });
    },

    updateOffRoutine(req, res) {
        const id = req.params.id;
        const body = req.body;

        Switches.find({_id:id}).populate('turnOnRoutine', 'turnOffRoutine')
            .then(sObject => {
                sObject.turnOffRoutine = body._id;
                Switches.findOneAndUpdate({_id:id},
                    {
                        turnOnRoutine:sObject.turnOnRoutine
                    }).populate('turnOnRoutine', 'turnOffRoutine')
                    .then(sObject2 => {
                        Switches.findOne({_id:id}).populate('turnOnRoutine')
                            .then(sObject3 => {
                                res.status(200).json(sObject3);
                            });
                    }).catch(err => {
                    console.log(err);
                    res.status(500).json({"msg":"Something went wrong server side."});
                });

            });
    }

};