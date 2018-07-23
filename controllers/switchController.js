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

  },

  updateSwitch(req, res) {

  },

  deleteSwitch(req, res) {

  },

  executeSwitch(req, res) {

  }
};