const Assert = require('assert');
const app = require('../app');
const request = require('supertest');
const LedstripController = require('../models/LedstripController');

var ledstrip = {
    name: 'bureau',
    address: 7,
    color: [
        255,
        255,
        255
    ]
};

var controllerId;
var controller = new LedstripController({
    name: 'slaap kamer',
    address: '192.168.1.103',
    ledstrips: [
        ledstrip
    ]
});

describe('Ledstrips and Controller Endpoint Test', () => {
    it('Can create new controller', (done) => {
        request(app)
            .post('/controllers')
            .send(controller)
            .then(response => {
                controllerId = response.body._id
                Assert(response.body.name = controller.name);
                done();
            })
    })

    xit('Can add ledstrip to controller', (done) => {
        request(app)
            .post('/ledstrips')
    })

    it('Can get all controllers', (done) => {
        request(app)
            .get('/controllers')
            .then(response => {
                Assert(response.body[0].name = controller.name);
                done();
            })
    });

    xit('Can get all ledstrips of one controller', (done) => {
        
    });

    xit('Can get one controller', (done) => {

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