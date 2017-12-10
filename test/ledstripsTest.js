const Assert = require('assert');
const app = require('../app');
const request = require('supertest');
const LedstripController = require('../models/LedstripController');

var ledstrip = {
    name: 'bureau',
    address: 7,
    color: '255:255:255'
};

var newLedstrip = {
    name: 'tv',
    address: 8,
    color: '255:255:255'
};

var controllerId;
var controller = new LedstripController({
    name: 'slaap kamer',
    address: '192.168.1.103',
    ledstrips: []
});

describe('Ledstrips and Controller Endpoint Test', () => {
    it('Can create new controller', (done) => {
        request(app)
            .post('/controllers')
            .send(controller)
            .then(response => {
                controllerId = response.body._id;
                Assert(response.body.name === controller.name);
                done();
            });
    });

    it('Can add ledstrip to controller', (done) => {
        request(app)
            .post('/ledstrips/' + controllerId)
            .send(newLedstrip)
            .then(response => {
                Assert(response.body.address === newLedstrip.address);
                done();
            });
    });

    it('Can get all controllers', (done) => {
        request(app)
            .get('/controllers')
            .then(response => {
                var address = parseInt(response.body[0].ledstrips[0].address);
                Assert(address == newLedstrip.address);
                done();
            });
    });

    it('Can get all ledstrips of one controller', (done) => {
        request(app)
            .get('/ledstrips/' + controllerId)
            .then(response => {
                Assert(response.body[0].address = newLedstrip.address);
                done();
            });
    });

    it('Can get one controller', (done) => {
        request(app)
            .get('/controllers/'+controllerId)
            .then(response => {
                Assert(response.body.address = newLedstrip);
                done();
            })
    });

    xit('Can get one ledstrip', (done) => {

    });

    xit('Can update one controller', (done) => {

    });

    xit('Can update one ledstrip', (done) => {

    });

    xit('Can delete one controller', (done) => {

    });

    xit('Can delete one ledstrip', (done) => {

    });
})