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

var controller = new LedstripController({
    name: 'slaapKamer',
    address: '192.168.1.103',
    ledstrips: [
        ledstrip
    ]
});

describe('Ledstrips and Controller Endpoint Test', () => {
    it('Can create new controller', (done) => {

    })

    it('Can add ledstrip to controller', (done) => {

    })

    it('Can get all controllers', (done) => {

    });

    it('Can get all ledstrips of one controller', (done) => {
        
    });

    it('Can get one controller', (done) => {

    });

    it('Can get one ledstrip', (done) => {

    });

    it('Can update one controller', (done) => {

    });

    it('Can update one ledstrip', (done) => {

    });

    it('Can delete one controller', (done) => {

    });

    it('Can delete one ledstrip', (done) => {

    });
})