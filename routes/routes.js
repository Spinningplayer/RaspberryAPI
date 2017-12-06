var package = require('../package');

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.status(200);
        res.json({msg: "RaspberryAPI version " + package.version});
        console.log("RaspberryAPI version " + package.version);
    });
}