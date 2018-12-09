var express = require("express");
var bodyParser = require("body-parser");
var Datastore = require("nedb");

var appServer = express();
appServer.use("/", express.static(__dirname + "/public"));

appServer.use(bodyParser.json());
var port = process.env.PORT || 8080;
var BASE_API_PATH = "/api/v1";

var initialContracts = [{
        "name": "SGT101_TIC",
        "description": "Expediente1"
    },
    {
        "name": "SGT102_TIC",
        "description": "Expediente 2"
    }
];

var db = new Datastore({
    filename: 'contracts.db',
    autoload: true
});

db.find({}, (err, contracts) => {
    if (err) {
        console.error("Error accessing DB");
        process.exit(1);
    }
    if (contracts.length == 0) {
        console.log("Db initiazied ...");
        db.insert(initialContracts);
    }
    else {

        console.log("DB initialized with " + contracts.length + " contracts");
    }
});


// Ejemplo de uso de callback
appServer.listen(port, () => {

        console.log("Starting Server on port %s ...TRUE", port);
    })
    // ejemplo de uso de eventos en node
    .on("error", (e) => {
        console.log("Server not ready" + e);
    });


console.log("Server setting up ... ", port);
appServer.get(BASE_API_PATH + "/contracts", (req, res) => {
    console.log(Date() + "- GET /contracts " + req.body);
    db.find({}, (err, contracts) => {
        if (err) {
            console.error("Error accessing DB");
            res.sendStatus(500);
        }
        res.send(contracts);
    });



});

appServer.put(BASE_API_PATH + "/contracts", (req, res) => {
    console.log(Date() + "- PUT /contracts" + req.body);

    res.sendStatus(405); //method not allowed
});
appServer.post(BASE_API_PATH + "/contracts", (req, res) => {
    console.log(Date() + "- POST /contracts" + req.body);
    var contract = req.body;
    db.insert(contract);
    res.sendStatus(201);
});

appServer.delete(BASE_API_PATH + "/contracts", (req, res) => {
    console.log(Date() + "- DELETE /contracts" + req.body);
    db.remove([]);
    res.sendStatus(200);
});

appServer.get(BASE_API_PATH + "/contracts/:name", (req, res) => {
    var name = req.params.name;
    console.log(Date() + "- GET /contracts/" + name + "/");

    db.find({ "name": name }, (err, contracts) => {
            if (err) {
                console.error("Error accessing DB");
                res.sendStatus(500);
            }

            res.send(contracts);
        }

    );
});


appServer.delete(BASE_API_PATH + "/contracts/:name", (req, res) => {
    var name = req.params.name;
    console.log(Date() + "- DELETE /contracts/ " + name + "/");
     db.remove({"name":name});
    res.sendStatus(200);
});

appServer.put(BASE_API_PATH + "/contracts/:name", (req, res) => {
    var name = req.params.name;
    var contract = req.body;
    console.log(Date() + "- PUT /contracts/" + name + "/");


    if (name != contract.name) {
        res.sendStatus(409);
        console.warn(Date() + "Hacking attempt!");
        return;
    }
    db.update({"name":name},contract);

    res.sendStatus(200);
});

appServer.post(BASE_API_PATH + "/contracts/:name", (req, res) => {
    var name = req.params.name;
    console.log(Date() + "- POST /contracts/ " + name + "/");

    res.sendStatus(405);
});

