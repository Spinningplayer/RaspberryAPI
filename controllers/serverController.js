var neo4j = require('neo4j-driver').v1;
var Server = require('../models/server');

var driver = neo4j.driver("bolt://localhost", neo4j.auth.basic('neo4j', 'Welkom123'));
var session = driver.session();

module.exports = {

    getServers(req, res){
        session.run('MATCH (n:Server)-[r:HAS]->(sp) return n, sp')
            .then((result)=>{
                var serverArray = [];
                result.records.forEach((record) => {
                    serverArray.push(new Server({
                        id: record._fields[0].identity.low,
                        name: record._fields[0].properties.name,
                        address: record._fields[0].properties.address,
                        ram: record._fields[1].properties.amount,
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

        session.run('MATCH (n:Server)-[r:HAS]->(sp) WHERE id(n)=toInt({paramID}) return n, sp', {paramID: id})
            .then(result => {

                var record = result.records[0];
                var newServer = new Server({
                    id: record._fields[0].identity.low,
                    name: record._fields[0].properties.name,
                    address: record._fields[0].properties.address,
                    ram: record._fields[1].properties.amount,
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
            'CREATE (n:Server { name: {nameParam}, address: {addressParam} }) RETURN n',
            {
                nameParam: body.name,
                addressParam: body.address,
                //ramParam: body.ram
            })
            .then(result => {
                var record = result.records[0];
                var newServer = new Server({
                    id: record._fields[0].identity.low,
                    name: record._fields[0].properties.name,
                    address: record._fields[0].properties.address,
                });

                module.exports.updateRam(newServer.id, body.ram).then((result => {
                    newServer.ram = result;
                    res.status(200);
                    res.json(newServer);
                }));
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
        session.run('MATCH (n:Server)-[r]-() WHERE id(n)=toInt({paramID}) DELETE n, r', {paramID: id})
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
              });

              module.exports.updateRam(id, body.ram).then((result => {
                  newServer.ram = result;
                  res.status(200);
                  res.json(newServer);
              }));
          })
          .catch(err => {
              console.log(err);

              res.status(500);
              res.json(err);

              session.close();
          })
    },

    updateRam(id, ram) {
        return new Promise((fulfill, reject) => {
            session.run('MERGE (ram:ServerSpec:Ram { amount: {ramParam} }) return ram',
                {
                    ramParam: ram
                }).then(result => {
                session.run(
                    'MATCH (s:Server)-[r:HAS]->(sp:ServerSpec:Ram) WHERE id(s)=toInt({paramID}) ' +
                    'DELETE r RETURN s',
                    {
                        paramID: id,
                        ramParam: ram
                    })
                    .then(result => {
                        session.run(
                            'MATCH (s:Server),(sp:ServerSpec:Ram) WHERE id(s)=toInt({paramID}) AND sp.amount={ramParam} ' +
                            'CREATE (s)-[r:HAS]->(sp) RETURN sp',
                            {
                                paramID: id,
                                ramParam: ram
                            })
                            .then(result => {
                                fulfill(result.records[0]._fields[0].properties.amount);
                            }).catch(err => {
                            console.log(err);

                            res.status(500);
                            res.json(err);

                            session.close();
                            reject(err);
                        })
                    }).catch(err => {
                    console.log(err);

                    res.status(500);
                    res.json(err);

                    session.close();
                    reject(err);
                })
            }).catch(err => {
                console.log(err);

                res.status(500);
                res.json(err);

                session.close();
                reject(err);
            })
        })
    }
};