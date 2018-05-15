const Assert = require('assert');
const app = require('../app');
const request = require('supertest');

let task = {
  type: 'mac',
  value: '00:00:00:00:00:00',
  sleepTime: 0
};
let taskId;

let routine = {
  name: 'Nas on',
};
let routineId;

describe('Routine and Task endpoints tests', () => {

  it('Can create new routine.', (done) => {
    request(app)
      .post('/routines/')
      .send(routine)
      .then(response => {
        routineId = response.body._id;
        Assert(response.body.name === routine.name);
        done();
      });
  });

  it('Can create new task.', (done) => {
    request(app)
      .post('/tasks/'+routineId)
      .send(task)
      .then(response => {
        taskId = response.body._id;
        Assert(response.body.type === task.type);
        done();
      });
  });

  it('Can get routine.', (done) => {
    request(app)
      .get('/routines/'+routineId)
      .then(response => {
        Assert(response.body.name === routine.name);
        done();
      });
  });

  it('Can get all routines.', (done) => {
    request(app)
      .get('/routines/')
      .then(response => {
        const i = response.body.length -1;
        Assert(response.body[i].name === routine.name);
        Assert(response.body[i].tasks[0].type === task.type);
        done();
      });
  });

  it('Can update routine.', (done) => {
    routine.name = 'PC on';
    request(app)
      .put('/routines/'+routineId)
      .send(routine)
      .then(response => {
        Assert(response.body.name === routine.name);
        done();
      });
  });

  it('Can update task.', (done) => {
    task.sleepTime = 1000;
    request(app)
      .put('/tasks/'+taskId)
      .send(task)
      .then(response => {
        Assert(response.body.sleepTime === task.sleepTime);
        done();
      });
  });

  it('Can delete task.', (done) => {
    request(app)
      .delete('/tasks/' + routineId +'/'+taskId)
      .then(response => {
        Assert(response.body === taskId);
        done();
      })
  });

  it('Can delete routine.', (done) => {
   request(app)
      .delete('/routines/'+routineId)
      .then(response => {
        Assert(response.body == routineId);
        done();
      });
  });
});