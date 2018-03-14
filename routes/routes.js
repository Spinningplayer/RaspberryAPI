var package = require('../package');

const serverController = require('../controllers/serverController');
const ledstripController = require('../controllers/ledstripsController');
const outletController = require('../controllers/outletController');
const musicController = require('../controllers/musicController')

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
    // Outlet endpoints
    //
    app.get('/outlets', outletController.getOutlets);
    app.get('/outlets/:id', outletController.getOutlet);
    app.post('/outlets', outletController.postOutlet);
    app.delete('/outlets/:id', outletController.deleteOutlet);
    app.put('/outlets/:id', outletController.putOutlet);
    app.put('/outlets/switch/:id', outletController.switchOutlet);

    //
    // Music endpoints
    //

    app.get('/playlists', musicController.getAllPlaylists);
    app.get('/playlists/:id', musicController.getPlaylistById);
    app.get('/songs/', musicController.getAllSongs);
    app.get('/songs/:id', musicController.getSongById);
    app.post('/playlists/', musicController.postPlaylist);
    app.post('/songs', musicController.postSong);
    app.delete('/playlists/:id', musicController.deletePlaylist);
    app.delete('/songs/:id', musicController.deleteSong);
    app.delete('playlists/:playlist/:song', musicController.deleteSongFromPlaylist);
    app.put('/playlists/:id', musicController.putPlaylist);
    app.put('/songs/:id', musicController.putSong);
    app.put('/playlists/:playlist/:song', musicController.addSongToPlaylist);
}