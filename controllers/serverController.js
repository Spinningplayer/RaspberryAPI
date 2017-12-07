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
                        address: record._fields[0].properties.address,
                        maxRAM: record._fields[0].properties.maxRAM,
                    }))
                });

                res.status(200);
                res.json(serverArray);

                session.close();
            })
            .catch(err => {
                console.log(err);

                res.status(500);
                res.json(err);

                session.close();
            })
    },

    getServer(req, res) {
        var id = req.params.id;

        session.run('MATCH (n:Server) WHERE id(n)=toInt({paramID}) return n', {paramID: id})
            .then(result => {
                var record = result.records[0];
                var newServer = new Server({
                    id: record._fields[0].identity.low,
                    name: record._fields[0].properties.name,
                    address: record._fields[0].properties.address,
                    maxRAM: record._fields[0].properties.maxRAM,
                });

                res.status(200);
                res.json(newServer);

                session.close();
            })
            .catch(err => {
                console.log(err);

                res.status(500);
                res.json(err);

                session.close();
            })
    },

    createServer(req, res) {
        var body = req.body;
        session.run(
            'CREATE (n:Server { name: {nameParam}, address: {addressParam}, maxRAM: {ramParam} }) RETURN n', {
                nameParam: body.name,
                addressParam: body.address,
                ramParam: body.maxRAM
            })
            .then(result => {
                var record = result.records[0];
                var newServer = new Server({
                    id: record._fields[0].identity.low,
                    name: record._fields[0].properties.name,
                    address: record._fields[0].properties.address,
                    maxRAM: record._fields[0].properties.maxRAM,
                });

                res.status(200);
                res.json(newServer);

                session.close();
            })
            .catch(err => {
                console.log(err);

                res.status(500);
                res.json(err);

                session.close();
            })
    },

    deleteServer(req, res) {
        var id = req.params.id;
        session.run('MATCH (n:Server) WHERE id(n)=toInt({paramID}) DELETE n', {paramID: id})
            .then(result => {
                res.status(200);
                res.json({id: id});

                session.close();
            }).catch(err => {
                console.log(err);

                res.status(500);
                res.json(err);

                session.close();
            })

    },

    updateServer(req, res) {
      var id = req.params.id;
      var body = req.body;
      session.run(
          'MATCH (n:Server) WHERE id(n)=toInt({paramID}) SET n.name={paramName}, n.address={paramAddress} RETURN n',
          {
              paramID: id,
              paramName: body.name,
              paramAddress: body.address
          })
          .then( result => {
              var record = result.records[0];
              var newServer = new Server({
                  id: record._fields[0].identity.low,
                  name: record._fields[0].properties.name,
                  address: record._fields[0].properties.address,
                  maxRAM: record._fields[0].properties.maxRAM,
              });

              res.status(200);
              res.json(newServer);

              session.close();
          })
          .catch(err => {
              console.log(err);

              res.status(500);
              res.json(err);

              session.close();
          })
    }
};