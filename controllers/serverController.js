var neo4j = require('neo4j-driver').v1;
var Server = require('../models/server');

var driver = neo4j.driver("bolt://localhost", neo4j.auth.basic('neo4j', 'Skaten01'));
var session = driver.session();

module.exports = {

    getServers(req, res){
        session.run('MATCH (n:Server) return n')
            .then((result)=>{
                var serverArray = [];
                result.records.forEach((record) => {
                    serverArray.push(new Server({
                        id: record._fields[0].identity.low,
                        name: record._fields[0].properties.name,
                        adress: record._fields[0].properties.address,
                        maxRAM: record._fields[0].properties.maxRAM,
                    }))
                });

                res.status(200);
                res.json(serverArray);

                session.close();
            })
            .catch(err => {
                res.status(500);
                res.json(err);
            })
    },

    getServer(req, res) {
        var id = req.params.id;

        session.run('MATCH (n:Server) WHERE id(n)=toInt({paramID}) return n', {paramID: id})
            .then(result => {
                console.log(result);
                var serverArray = [];
                result.records.forEach((record) => {
                    serverArray.push(new Server({
                        id: record._fields[0].identity.low,
                        name: record._fields[0].properties.name,
                        adress: record._fields[0].properties.address,
                        maxRAM: record._fields[0].properties.maxRAM,
                    }))
                });

                res.status(200);
                res.json(serverArray);
            })
            .catch(err => {
                console.log(err);
                res.status(500);
                res.json(err);
            })
    }
};