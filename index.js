var express = require("express");
var bodyParser = require("body-parser");
var Datastore = require("nedb");
var contractsAPI = require("./contractsAPI");
var appServer = express();
appServer.use("/", express.static(__dirname + "/public"));

appServer.use(bodyParser.json());
var port = process.env.PORT || 8080;


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

contractsAPI.register(appServer,db);

// Ejemplo de uso de callback
appServer.listen(port, () => {

        console.log("Starting Server on port %s ...TRUE", port);
    })
    // ejemplo de uso de eventos en node
    .on("error", (e) => {
        console.log("Server not ready" + e);
    });


console.log("Server setting up ... ", port);
