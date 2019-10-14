const Assert = require('assert');
const app = require('../app');
const request = require('supertest');

let onRoutine = {
    name: 'on routine'
};
let onId;

let offRoutine = {
    name: 'off routine'
};
let offId;

let switchObject = {
    name: "Switch Object",
};
let switchId;

describe('Switch endpoint tests', () => {
    it('Can create new Switch', (done) => {
        request(app)
            .post('/switches/')
            .send(switchObject)
            .then(response => {
                switchId = response.body._id;
                Assert(response.body.name === switchObject.name);
                done();
            });
    });

    it('Can get all Switches', (done) => {
        request(app)
            .get('/switches/')
            .then(response => {
                Assert(response.body[0].name === switchObject.name);
                done();
            });
    });

    it('Can update Switch', (done) => {
        const newName = 'new Name';
        switchObject.name = newName;
        request(app)
            .put('/switches/'+switchId)
            .send(switchObject)
            .then(response => {
                Assert(response.body.name === newName);
                done();
            });
    });

    it('Can update onRoutine', (done) => {
        request(app)
            .get('/routines/')
            .then(routineResponse => {
                let routine = routineResponse.body[0];
                request(app)
                    .put('/switches/on/'+switchId)
                    .send(routine)
                    .then(response => {
                        console.log(response.body);
                        Assert(response.body.turnOnRoutine.name === routine.name);
                        done();
                    })
            })
    });

    it('Can update offRoutine', (done) => {
        request(app)
            .get('/routines/')
            .then(routineResponse => {
                let routine = routineResponse.body[0];
                request(app)
                    .put('/switches/off/'+switchId)
                    .send(routine)
                    .then(response => {
                        console.log(response.body);
                        Assert(response.body.turnOffRoutine.name === routine.name);
                        done();
                    })
            })
    });

    it('Can delete switch', (done) => {
        request(app)
            .delete('/switches/'+switchId)
            .then(response => {
                Assert(response.body.msg === "Succesfuly deleted switch.");
                done();
            })
    });
});

