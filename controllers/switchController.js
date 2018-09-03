const Switches = require('../models/Switch');
const Routines = require('../models/Routine');

module.exports = {
  getSwitches(req, res) {
      Switches.find({}).populate('onRoutine', "offRoutine")
        .then(switches => {
          res.status(200);
          res.json(switches);
        })
        .catch(err => {
          res.status(500);
          res.json({"msg":"Something went wrong"});

          console.log(err);
        });
  },

  getSwitch(req, res) {
    const id = req.params.id;

    Switches.findOne({_id: id}).populate('onRoutine', 'offRoutine')
      .then(s => {
        res.status(200);
        res.json(s);
      })
      .catch(err => {
        res.status(500);
        res.json({"msg":"Something went wrong"});

        console.log(err);
      });
  },

  createSwitch(req, res) {
    const body = req.body;
    Switches.create(body)
        .then(result => {
          res.status(200);
          res.send(result);
        })
        .catch(err => {
          res.status(500);
          res.send(err);
        })
  },

  updateSwitch(req, res) {
    Switches.findOneAndUpdate({_id: req.params.id}, req.body).populate('onRoutine', 'offRoutine')
        .then(switchObj => {
            res.status(200);
            res.json(req.body);
        })
        .catch(err => {
            console.log(err);
            res.status(500);
            res.send("err on server side");
        });
  },

  deleteSwitch(req, res) {
    const id = req.params.id;
    Switches.findOneAndRemove({_id: id})
        .then(() => {
            res.status(200);
            res.json({"msg":"successfully removed object"});
        })
        .catch(err => {
            console.log(err);
            res.status(500);
            res.send("err on server side");
        });
  },

  executeSwitch(req, res) {
    const id = req.params.id;

    Switches.findOne({_id: id}).populate('onRoutine', 'offRoutine')
        .then(switchObj => {
            const routine = !switchObj.state ? switchObj.onRoutine : switchObj.offRoutine;

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
                switchObj.state = !switchObj.state;
                Switches.findOneAndUpdate({_id: id}, switchObj)
                    .then(result => {
                        res.status(200);
                        res.json({"msg": "successfully switched"});
                    }).catch(err => {
                        console.log(err);
                        res.status(500);
                        res.json({"msg":"failed to execute"});
                })
            } else {
                res.status(500);
                res.json({"msg": "failed to switch"});
            }
        })

  }
};