const Assert = require('assert');
const app = require('../app');
const request = require('supertest');

var outlet = {
  name: 'Printer',
  number: 1,
  state: false
};
var outletId;

xdescribe('Outlet endpoints tests',()=>{

  it('can create new outlet', (done) => {
    request(app)
      .post('/outlets')
      .send(outlet)
      .then(response => {
        outletId = response.body._id;
        Assert(response.body.name === outlet.name);
        done();
      })
  });

  xit('can get all outlets', (done) => {
    request(app)
      .get('/outlets')
      .then(response => {
        console.log(response.body);
        Assert(response.body[0].name === outlet.name);
        done();
      });
  });

  it('can get one outlet', (done) => {
    request(app)
      .get('/outlets/' + outletId)
      .then(response => {
        Assert(response.body.name === outlet.name);
        done();
      });
  });

  it('can update outlet', (done) => {
    outlet.state = true;
    request(app)
      .put('/outlets/' + outletId)
      .send(outlet)
      .then(response => {
        console.log(response.body);
        Assert(response.body.state === outlet.state);
        done();
      });
  });

  it('can delete outlet', (done) => {
    request(app)
      .delete('/outlets/' + outletId)
      .then(response => {
        Assert(response.body === outletId);
        done();
      });
  });
});