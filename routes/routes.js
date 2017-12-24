var package = require('../package');

const serverController = require('../controllers/serverController');
const ledstripController = require('../controllers/ledstripsController');
const outletController = require('../controllers/outletController');

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.status(200);
        res.json({msg: "RaspberryAPI version " + package.version});
        console.log("RaspberryAPI version " + package.version);
    });

    //
    // Server endpoints
    //
    app.get('/servers', serverController.getServers);
    app.get('/servers/:id', serverController.getServer);
    app.post('/servers', serverController.createServer);
    app.delete('/servers/:id', serverController.deleteServer);
    app.put('/servers/:id', serverController.updateServer);

    //
    // LedstripController endpoints
    //
    app.get('/controllers', ledstripController.getControllers);
    app.get('/controllers/:id', ledstripController.getController);
    app.post('/controllers', ledstripController.addController);
    app.delete('/controllers/:id', ledstripController.deleteController);
    app.put('/controllers/:id', ledstripController.updateController);

    //
    // Ledstrips endpoints
    //
    app.get('/ledstrips/:id', ledstripController.getLedstrips);
    app.get('/ledstrips/:id/:address', ledstripController.getLedstrip);
    app.post('/ledstrips/:id', ledstripController.addLedstrip);
    app.delete('/ledstrips/:id/:controller', ledstripController.deleteLedstrip);
    app.put('/ledstrips/:id', ledstripController.updateLedstrip);

    //
    //Outlet endpoints
    //
  app.get('/outlets', outletController.getOutlets);
  app.get('/outlets/:id', outletController.getOutlet);
  app.post('/outlets', outletController.postOutlet);
  app.delete('/outlets/:id', outletController.deleteOutlet);
  app.put('/outlets/:id', outletController.putOutlet);
}