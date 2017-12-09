const mongo = require('../Config/mongo.db');
const Controller = require('../models/LedstripController')

module.exports = {

    getControllers(req, res) {
        Controller.find({})
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

        Controller.findOne({_id: id})
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

        Controller.find({_id: id})
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

        Controller.find({_id: id})
            .then(controller => {
                controller.ledstrips.find({address: address})
                    .then(strip => {
                        res.status(200);
                        res.json(strip);
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
    addController(req, res) {
        var body = req.body;
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

        Controller.find({_id: id})
            .then(controller => {
                controller.ledstrips.create(body)
                    .then(strip => {
                        res.status(200);
                        res.json(strip);
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

        Controller.findOneAndUpdate({_id: id}, body)
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
    updateLedstrip(req, res) {
        var id = req.params.id;
        var address = req.params.address;
        var body = req.body;

        Controller.find({_id: id})
            .then(controller => {
                controller.ledstrips.findOneAndUpdate({address: address}, body)
                    .then(strip => {
                        res.status(200);
                        res.json(strip);
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
    deleteController(req, res) {
        var id = req.params.id;

        Controller.findOneAndRemove({_id: id})
            .then(result => {
                res.status(200);
                res.json(result);
            })
            .catch(err => {
                res.status(500);
                res.json(err);

                console.log(err);
            });
    },
    deleteLedstrip(req, res) {
        var id = req.params.id;
        var address = req.params.address;

        Controller.find({_id: id})
            .then(controller => {
                controller.ledstrips.findOneAndRemove({address: address})
                    .then(result => {
                        res.status(200);
                        res.json(result);
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
    }
}