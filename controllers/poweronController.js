const wol = require('wake_on_lan');
const request = require('request');
const { exec } = require('child_process');

module.exports = {
    startWithMac(req, res) {
        const mac = req.body.mac;
        wol.wake(mac, (err) => {
            if(err) {
                console.log(err);
                res.status(500);
                res.json({"msg":"Something went wrong on our side."});
            } else {
                res.status(200);
                res.json({"msg":"Device successfully turned on."});
            }
        })
    },

    startWithRest(req, res) {
        const url = req.body.url;
        request.get(
            url,
            (err, response, body) => {
                if(err) {
                    console.log(err);
                    res.status(500);
                    res.json({"msg":"Something went wrong on our side."});
                    return null;
                }
                res.status(200);
                res.json({"msg":"Device successfully turned on."});
            }
        );
    },

    stopWithRest(req, res) {
        const url = req.body.url;
        exec('ssh root@192.168.1.101 > sudo shutdown -h now', (err, stdout, stderr) => {
           if(err) {
               console.log(err);
               res.status(500);
               res.json({"msg":"Failed to turn off computer"});
               return null;
           }
        });

        setTimeout(10000);

        request.get(
            url,
            (err, response, body) => {
                if(err) {
                    console.log(err);
                    res.status(500);
                    res.json({"msg":"Failed to turn off HDD"});
                    return null;
                }
                res.status(200);
                res.json({"msg":"Device successfully turned off."});
            }
        );
    }
}
