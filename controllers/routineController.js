const wol = require('wake_on_lan');
const request = require('request');
const { exec } = require('child_process');

const neo4j = require('neo4j-driver').v1;
const driver = neo4j.driver("bolt://localhost", neo4j.auth.basic('neo4j', 'Welkom123'));
const session = driver.session();

const Routines = require('../models/Routine');
const Tasks = require('../models/Task');


module.exports= {

    getRoutines(req, res) {
        Routines.find({}).populate('tasks')
            .then( routines => {
                res.status(200);
                res.json(routines);
            })
            .catch(err => {
                res.status(500);
                res.json({"msg":"Something went wrong"});

                console.log(err);
            });
    },

    getRoutine(req, res) {
        const id = req.params.id;

        Routines.findOne({_id: id}).populate('tasks')
            .then( routine => {
                res.status(200);
                res.json(routine);
            })
            .catch(err => {
                res.status(500);
                res.json({"msg":"Something went wrong"});

                console.log(err);
            });
    },

    createTask(req, res) {
      const body = req.body;
      const id = req.params.id;

      Tasks.create(body)
          .then( task => {
              Routines.findOne({_id: id}).populate('tasks')
                  .then(routine => {
                    routine.tasks.push(task._id);
                    Routines.findOneAndUpdate({_id: id}, routine).populate('tasks')
                        .then( updatedRoutine => {
                            res.status(200);
                            res.json(task);
                        })
                        .catch(err => {
                            res.status(500);
                            res.json({"msg":"Something went wrong"});

                            console.log(err);
                        });
                  })
                  .catch(err => {
                      res.status(500);
                      res.json({"msg":"Something went wrong"});

                      console.log(err);
                  });
          })
          .catch(err => {
              res.status(500);
              res.json({"msg":"Something went wrong"});

              console.log(err);
          });

    },

    addRoutine(req, res) {
        const body = req.body;

        if(!Array.isArray(body.tasks)){
            body.tasks = [];
        }

        Routines.create(body)
            .then( routine => {
                res.status(200);
                res.json(routine);
            })
            .catch(err => {
                res.status(500);
                res.json({"msg":"Something went wrong"});

                console.log(err);
            });
    },

    updateRoutine(req, res) {
        const body = req.body;
        const id = req.params.id;

        Routines.findOneAndUpdate({_id: id}, {name: body.name, state: body.state}).populate('tasks')
            .then( routine => {
                res.status(200);
                res.json(body);
            })
            .catch(err => {
                res.status(500);
                res.json({"msg":"Something went wrong"});

                console.log(err);
            });
    },

    updateTask(req, res) {
        const body = req.body;
        const id = req.params.id;

        Tasks.findOneAndUpdate({_id: id}, body)
            .then( task => {
                res.status(200);
                res.json(body);
            })
            .catch(err => {
                res.status(500);
                res.json({"msg":"Something went wrong"});

                console.log(err);
            });
    },

    deleteRoutine(req, res) {
        const id = req.params.id;

        Routines.findOne({_id: id}).populate('tasks')
            .then(routine => {
                for (let i = 0; i < routine.tasks.length; i++) {
                    task = routine.tasks.pop();
                    Tasks.findOneAndRemove({_id: task.id})
                        .then(result => {})
                        .catch(err => { return err});
                }

                Routines.findOneAndRemove({_id: id})
                    .then( result => {
                        res.status(200);
                        res.json(id);
                    })
                    .catch(err => {
                        res.status(500);
                        res.json({"msg":"Something went wrong"});

                        console.log(err);
                    });
            })
    },

    deleteTask(req, res) {
        const taskId = req.params.task;
        const routineId = req.params.routine;

        Routines.findOne({_id: routineId}).populate('tasks')
            .then(routine => {
                function remove(array, id) {
                    return array.filter(e => e._id.toString() !== id.toString());
                }

                routine.tasks = remove(routine.tasks, taskId);

                Routines.findOneAndUpdate({_id: routineId}, routine)
                    .then(result => {
                        Tasks.findOneAndRemove({_id: taskId})
                            .then( result2 => {
                                res.status(200);
                                res.json(taskId);
                            })
                            .catch(err => {
                                res.status(500);
                                res.json({"msg":"Something went wrong"});

                                console.log(err);
                            });
                    })
                    .catch(err => {
                        res.status(500);
                        res.json({"msg":"Something went wrong"});

                        console.log(err);
                    });
            })
    },

    executeRoutine(req, res) {
        const id = req.params.id;

        Routines.findOne({_id: id}).populate('tasks')
            .then(routine => {

                let success = true;
                let count = 1;
                let max = routine.tasks.length;
                for( const task of routine.tasks) {
                    if(!success) {
                        break;
                    }

                    setTimeout(() => {
                        switch(task.type) {
                            case 'mac':
                                wol.wake(task.value, (err) => {
                                    if(err) {
                                        console.log(err);
                                        success = false;
                                    } else {

                                    }
                                });
                                count++;
                                break;


                            case 'url':
                                request.get(
                                    task.value,
                                    (err, response, body) => {
                                        if(err) {
                                            console.log(err);

                                            success = false;
                                        }
                                    }
                                );
                                count++;
                                break;

                            case 'command':
                                exec(task.value, (err, stdout, stderr) => {
                                    if(err) {
                                        console.log(err);

                                        success = false;
                                    }
                                });
                              count++;
                        }
                    }, task.sleepTime)
                }
                // while(count < max) {}
                if(success) {
                  res.status(200);
                  res.json({"msg": "successfully executed routine"});
                } else {
                  res.status(500);
                  res.json({"msg": "failed to execute routine"});
                }
            })
    }
};