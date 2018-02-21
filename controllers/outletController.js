const Outlets = require('../models/outlet');
const { exec } = require('child_process');

module.exports = {
  getOutlets(req, res) {
    Outlets.find({})
      .then(outlets => {
        res.status(200);
        res.json(outlets);
      })
      .catch(err => {
        res.status(500);
        res.json(err);

        console.log(err);
      });
  },

  getOutlet(req, res) {
    var id = req.params.id;

    Outlets.findOne({_id: id})
      .then(outlet => {
        res.status(200);
        res.json(outlet);
      })
      .catch(err => {
        res.status(500);
        res.json(err);

        console.log(err);
      });
  },

  postOutlet(req, res) {
    var outlet = req.body;

    Outlets.create(outlet)
      .then(outlet => {
        res.status(200);
        res.json(outlet);
      })
      .catch(err => {
        res.status(500);
        res.json(err);

        console.log(err);
      });
  },

  putOutlet(req, res) {
    var body = req.body;
    var id = req.params.id;
    Outlets.findOneAndUpdate({_id: id}, body)
      .then(outlet => {
        res.status(200);
        res.json(body);
      })
      .catch(err => {
        res.status(500);
        res.json(err);

        console.log(err);
      });
  },

  deleteOutlet(req, res) {
    var id = req.params.id;
    Outlets.findOneAndRemove({_id: id})
      .then(result => {
        res.status(200);
        res.json(id);
      })
      .catch(err => {
        res.status(500);
        res.json(err);

        console.log(err);
      });
  },

  switchOutlet(req, res) {

    const body = req.body;
    const action = (body.state) ? "on" : "off";
    exec('/home/thijs/PycharmProjects/APC_scripts/quackenbush.py --'+action+' ' + body.number, (err, stdout, stderr) => {
      if (err) {
        res.status(500);
        return;
      }

      Outlets.findOneAndUpdate({_id: req.params.id}, body);

      res.status(200);
      res.json({ "state": action});
    });
  }
}