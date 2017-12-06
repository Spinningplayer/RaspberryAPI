var package = require('../package');

const serverController = require('../controllers/serverController');

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.status(200);
        res.json({msg: "RaspberryAPI version " + package.version});
        console.log("RaspberryAPI version " + package.version);
    });

    app.get('/servers', serverController.getServers);
    app.get('/servers/:id', serverController.getServer);
}