const Assert = require('assert');
const app = require('../app');
const request = require('supertest');

let switchObj = {
    name: 'test switch',
    state: false,
    onRoutine: {
        "_id" : "5b034adb71efbe28a3420090",
        "name" : "NAS on",
        "tasks" : [
            "5b0454d88da1c950b95000b0"
        ],
        "__v" : 0
    },
    offRoutine: {
        "_id" : "5b49d439eb4fad1361da7043",
        "name" : "test",
        "tasks" : [],
        "__v" : 0
    }
};

let switchId;

describe('Switch endpoint tests', () => {

    it('can create new switch', (done) => {
        request(app)
            .post('/switches/')
            .send(switchObj)
            .then(response => {
                switchId = response.body._id;
                Assert(response.body.name === switchObj.name);
                done();
            });
    });

    it('can get switches', (done) => {
        request(app)
            .get('/switches')
            .then(response => {
                Assert(response.body[0].state === switchObj.state);
                done();
            });
    });

    it('can update switch', (done) => {
        switchObj.name = 'different name';

        request(app)
            .put('/switches/'+switchId)
            .send(switchObj)
            .then(response => {
                Assert(response.body.name === 'different name');
                done();
            })
    });

    it('can delete switch', (done) => {
        request(app)
            .delete('/switches/'+switchId)
            .then(response => {
                Assert(response.body.msg === "successfully removed object");
                done();
            });
    });
});