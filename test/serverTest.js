const Assert = require('assert');
const app = require('../app');
const request = require('supertest');

const server = {
    name: "testServer",
    address: "0.0.0.0",
    ram: "1024"
}
var serverId;

xdescribe('server endpoint test', () => {

    it('can create new server', (done) => {
        request(app)
            .post('/servers')
            .send(server)
            .then((result) => {
                var body = result.body;
                serverId = result.body.id;
                Assert(body.name === server.name);
                done();
            })
    })

    it('can get all servers', (done) => {
        request(app)
            .get('/servers')
            .then(result => {

                Assert(result.body[0].name != null);
                done();
            })
    })

    it('can get one servers', (done) => {
        request(app)
            .get('/servers/' + serverId)
            .then(result => {

                Assert(result.body.name === server.name);
                done();
            })
    })

    it('can update one server', (done) => {
        server.address = '0.0.0.1';

        request(app)
            .put('/servers/' + serverId)
            .send(server)
            .then(result => {
                Assert(result.body.address == server.address);
                done();
            })
    })

    it('can delete one server', (done) => {
        request(app)
            .delete('/servers/' + serverId)
            .then(result => {
                Assert(result.body.id == serverId);
                done();
            })
    })

})