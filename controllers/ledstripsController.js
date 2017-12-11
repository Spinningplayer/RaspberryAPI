const mongo = require('../Config/mongo.db');
const Controller = require('../models/LedstripController')
const Ledstrip = require('../models/LedStrip');

module.exports = {

    getControllers(req, res) {
        Controller.find({ }).populate('ledstrips')
            .then(controllers => {
                res.status(200);
                res.json(controllers);
            })
            .catch(err => {
                res.status(500);
                res.json(err);

                console.log(err);
            });
    },
    getController(req, res) {
        var id = req.params.id;

        Controller.findOne({_id: id}).populate('ledstrips')
            .then(controller => {
                res.status(200);
                res.json(controller);
            })
            .catch(err => {
                res.status(500);
                res.json(err);

                console.log(err);
            });

    },
    getLedstrips(req, res) {
        var id = req.params.id;

        Controller.findOne({_id: id}).populate('ledstrips')
            .then(controller => {
                var strips = controller.ledstrips;

                res.status(200);
                res.json(strips);
            })
            .catch(err => {
                res.status(500);
                res.json(err);

                console.log(err);
            });
    },
    getLedstrip(req, res) {
        var id = req.params.id;
        var address = req.params.address;

        Controller.findOne({_id: id}).populate('ledstrips')
            .then(controller => {
                var strip = controller.ledstrips.filter(strip => {
                    return strip.address = address;
                }).pop();
                if(strip != null) {
                    res.status(200);
                    res.json(strip);
                } else {
                    res.status(404);
                    res.json({msg : 'Object not found'});
                }
            })
            .catch(err => {
                res.status(500);
                res.json(err);

                console.log(err);
            });
    },
    addController(req, res) {
        var body = req.body;

        if(!Array.isArray(body.ledstrips)) {
            body.ledstrips = [];
        }

        Controller.create(body)
            .then(controller => {
                res.status(200);
                res.json(controller);
            })
            .catch(err => {
                res.status(500);
                res.json(err);

                console.log(err);
            });
    },
    addLedstrip(req, res) {
        var body = req.body;
        var id = req.params.id;

        Ledstrip.create(body)
            .then(ledstrip => {
                Controller.findOne({_id: id}).populate('ledstrips')
                    .then(controller => {
                        controller.ledstrips.push(ledstrip._id);
                        Controller.findOneAndUpdate({_id: id}, controller)
                            .then(result => {
                                res.status(200);
                                res.json(body);
                            })
                    })
                    .catch(err => {
                        res.status(500);
                        res.json(err);

                        console.log(err);
                    });
            })
            .catch(err => {
                res.status(500);
                res.json(err);

                console.log(err);
            });
    },
    updateController(req, res) {
        var body = req.body;
        var id = req.params.id;

        Controller.findOneAndUpdate({_id: id}, {name: body.name, address: body.address})
            .then(controller => {
                res.status(200);
                res.json(body);
            })
            .catch(err => {
                res.status(500);
                res.json(err);

                console.log(err);
            });

    },
    updateLedstrip(req, res) {
        var id = req.params.id;
        var address = req.params.address;
        var body = req.body;

        Ledstrip.findOneAndUpdate({_id: id}, body)
            .then(ledstrip => {
                res.status(200);
                res.json(req.body);
            })
            .catch(err => {
                res.status(500);
                res.json(err);

                console.log(err);
            });
    },
    deleteController(req, res) {
        var id = req.params.id;

        Controller.findOneAndRemove({_id: id})
            .then(result => {
                res.status(200);
                res.json(id);
            })
            .catch(err => {
                res.status(500);
                res.json(err);

                console.log(err);
            });
    },
    deleteLedstrip(req, res) {
        var id = req.params.id;
        var controllerId =req.params.controller;

        Controller.findOne({_id: controllerId}).populate('ledstrips')
            .then(controller => {
                function remove(array, id) {
                    return array.filter(e => e._id.toString() !== id.toString());
                }

                controller.ledstrips = remove(controller.ledstrips, id);

                Controller.findOneAndUpdate({_id: controllerId}, controller)
                    .then(result => {
                        Ledstrip.findOneAndRemove({_id: id})
                            .then(result2 => {
                                res.status(200);
                                res.json(id);
                            })
                            .catch(err => {
                                res.status(500);
                                res.json(err);

                                console.log(err);
                            });
                    })
            })
    }
}