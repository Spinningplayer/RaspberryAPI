const mongo = require('../Config/mongo.db');
var Servers = require('../models/server');

module.exports = {

    getServers(req, res){
        Servers.find({})
            .then(servers => {
                res.status(200);
                res.json(servers);
            })
            .catch(err => {
                res.status(500);
                res.json(err);
            })
    },

    getServer(req, res) {
        var id = req.params.id;

        Servers.findOne({_id: id})
            .then(server => {
                res.status(200);
                res.json(server);
            })
            .catch(err => {
                res.status(500);
                res.json(err);
            });
    },

    createServer(req, res) {
        var body = req.body;
        
        Servers.create(body)
            .then(server => {
                res.status(200);
                res.json(server);
            })
            .catch(err => {
                res.status(500);
                res.json(err);
            });
    },

    deleteServer(req, res) {
        var id = req.params.id;
        
        Servers.findOneAndRemove({_id: id})
            .then(result => {
                res.status(200);
                res.json(id);
            })
            .catch(err => {
                res.status(500);
                res.json(err);
            });
    },

    updateServer(req, res) {
        var body = req.body;
        var id = req.params.id;

        Servers.findOneAndUpdate({_id: id}, body)
            .then(server => {
                res.status(200);
                res.json(body);
            })
            .catch(err => {
                res.status(500);
                res.json(err);
            });
    }
};