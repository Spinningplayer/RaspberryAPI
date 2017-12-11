const Assert = require('assert');
const app = require('../app');
const request = require('supertest');
const LedstripController = require('../models/LedstripController');

var ledstripId;
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
                Assert(response.body[0].address == controller.address);
                done();
            });
    });

    it('Can get all ledstrips of one controller', (done) => {
        request(app)
            .get('/ledstrips/' + controllerId)
            .then(response => {
                ledstripId = response.body[0]._id;
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

    it('Can get one ledstrip', (done) => {
        request(app)
            .get('/ledstrips/'+controllerId+'/'+newLedstrip.address)
            .then(response => {
                Assert(response.body.name === newLedstrip.name);
                done();
            })
    });

    it('Can update one controller', (done) => {
        controller.name = "slaapkamer";
        request(app)
            .put('/controllers/'+controllerId)
            .send(controller)
            .then(response => {
                Assert(response.body.name === controller.name);
                done();
            })
    });

    it('Can update one ledstrip', (done) => {
        newLedstrip.name = 'bureau';
        request(app)
            .put('/ledstrips/'+ledstripId)
            .send(newLedstrip)
            .then(response => {
                Assert(response.body.name = newLedstrip.name);
                done();
            })
    });

    it('Can delete one ledstrip', (done) => {
        request(app)
            .delete('/ledstrips/' + ledstripId +'/'+controllerId)
        .then(response => {
            Assert(response.body == ledstripId);
            done();
        })
    });

    it('Can delete one controller', (done) => {
        request(app)
            .delete('/controllers/' + controllerId)
            .then(response => {
                console.log(response.body);
                Assert(response.body == controllerId);
                done();
            })
    });
})